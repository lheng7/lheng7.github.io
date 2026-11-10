---
title: PID 温度控制器
summary: 基于 STM32 的恒温控制系统，PID 参数自动整定的桌面级实现。
startDate: "2025-03"
endDate: "2025-06"
order: 10
featured: true
tags: ["STM32", "嵌入式 C", "控制理论", "PCB"]
links:
  - label: GitHub 仓库
    href: https://github.com/your-username/pid-thermostat
---

## 背景

课程设计要求做一个恒温箱，精度做到 ±0.5 °C。最初用开关式控制（bang-bang），温度在设定值附近来回震荡，超调能到 3 °C，达不到要求，于是改用 PID。

## 硬件

- **主控**：STM32F103C8T6，最小系统板
- **测温**：PT100 铂电阻 + MAX31865 转 SPI（比 DS18B20 精度高，也方便做多点）
- **加热**：12 V 陶瓷加热片，IRF540N 低边驱动，PWM 从 TIM3 输出
- **散热**：40 mm 风扇，独立供电，避免干扰采样

PCB 是自己画的，两层板，模拟地和功率地单点连接——这是第一次实测体会到地环路噪声，一开始温度读数抖动 ±1.5 °C，改了地平面之后降到 ±0.15 °C。

## 控制

用增量式 PID，位置式容易积分饱和：

```c
float pid_update(PID *p, float setpoint, float measured) {
    float err = setpoint - measured;
    p->integral += err;
    /* 积分限幅，防止 windup */
    if (p->integral > p->i_max) p->integral = p->i_max;
    if (p->integral < p->i_min) p->integral = p->i_min;

    float deriv = err - p->last_err;
    float out = p->kp * err
              + p->ki * p->integral
              + p->kd * deriv;
    p->last_err = err;

    return clampf(out, 0.0f, PWM_MAX);
}
```

参数整定用的是**临界比例度法**：先把 Ki、Kd 归零，慢慢加大 Kp 直到等幅振荡，记下临界增益 Ku 和振荡周期 Tu，再按 Ziegler-Nichols 表取值。实测 Kp=8.0、Ki=0.35、Kd=1.2 时稳态误差在 ±0.3 °C 内，超调 0.8 °C。

## 结果与反思

| 指标 | 开关控制 | PID |
|---|---|---|
| 稳态误差 | ±2.5 °C | ±0.3 °C |
| 超调 | 3.0 °C | 0.8 °C |
| 稳定时间 | — | 约 90 s |

**做得不好的地方**：微分项直接对误差差分，设定值突变时会有微分冲击（derivative kick）。正确做法是对测量值微分而不是对误差微分，这个我后来看教材才发现，下个版本改。

另外整定过程完全靠手调，很费时间。打算之后补一个简单的继电反馈自动整定，让系统自己测出 Ku 和 Tu。
