export const models = {
  // 0 species
  "name_en": "",
  "name_cn": "",
  "description_en": "",
  "description_cn": "",
  // 1 cultivars
  "cultivars": [
    {
      "name_en": "",
      "name_cn": "",
      "description_en": "",
      "description_cn": "",
      // 2 models
      "models": [
        {
          "name_en": "",
          "name_cn": "",
          "description_en": "",
          "description_cn": "",
          "available_grow_objectives": [],
          "available_grow_techniques": [],
          // 3 phases
          "phases": [
            {
              "phase_index": 0,
              "name_en": "",
              "name_cn": "",
              "description_en": "",
              "description_cn": "",
              "base": [
                // 4 instruction
                {
                  // 5 action
                  "action": {
                    "snippet_type": "action",
                    "status": "active", // "active" or "inactive"-"活动"或"非活动"
                    "type": "no_feedback", // "no_feedback" or "feedback"-无反馈”或“反馈”
                    "hardware": "growLED",
                    "environmental_factor": "", // "temperature", "humidity", "CO2", etc.-温度湿度二氧化碳等等
                    "instruction": "turn_on", // "turn_on", "turn_off", "set_value"-“打开”、“关闭”、“设置值”
                    "value": [ 100, 100, 100 ], // value to set, could be a single value or an array of values
                    // - 要设置的值，可以是单个值，也可以是值数组
                    "curve": "linear",
                    "curve_duration": "00:30:00"
                  },
                  "status": "active", // "active" or "inactive"-"活动"或"非活动"
                  "type": "timed", // "timed" or "interval"-“定时”或“间隔”
                  // if "type" is "timed"-如果“类型”是“定时”的
                  "n-weeks": 1, // every n weeks-每隔n周
                  "dow": [ 1, 1, 1, 1, 1, 1, 1 ], // Event takes place for everyday of the week-事件发生在一周中的每一天。
                  "tod": "08:00:00", // time of day-一天中的时间
                  // if "type" is "interval"-如果“type”是“间隔”
                  "interval": "00:30:00",
                  "duration": "16:00:00"
                }
              ], // Array of instructions, should normally be in two sets, one for day and one for night.
              // - 指令数组，通常应该有两套，一套用于白天，一套用于晚上。
              "scheduled_events": [], // Array of scheduled_events, same object design as instructions
              // - scheduled_events数组，对象设计与指令相同
              "triggers": [
                // 6 trigger
                {
                  "name_en": "",
                  "name_cn": "",
                  "status": "active", // "active", "single_event", "completed", "cancelled"
                  "triggered": false,
                  "type": "exception", // "exception", "trend", "rate"
                  /** */
                  "metric": "", // "CO2_ppm", "DHT_temp", etc——下拉框数据源文件：environmental_factor_options.json
                  /** */
                  "operator": "", // "greater_than", "greater_than_or_equal_to", "less_than", "less_than_or_equal_to", "not_equal_to". No special characters like >=, <=, != (any)
                  // 大于”，“大于或等于”，“小于”，“小于或等于”，“不等于”。没有特殊字符，如>=,<=,！=（任何）
                  "threshold": 20, // metric-specific _ 公制特定
                  /**
                   * exception：三个都没得
                   * trend：三个都有
                   * rate：只有前两个
                   */
                  "direction": "", // "increasing", "decreasing", "maintaining". No special characters like +, -, =
                  // "增加的"、"减少的"、"保持的"不能使用特殊字符，如+，—，=
                  "timeframe": "00:30:00", // only when "type" is "trend" and "rate". sampling range, how far back. hh:mm:ss
                  // 只有当“型”是“趋势”和“率”。采样范围，追溯到多远。哈哈：毫米：ss
                  "toi": "00:30:00" // only when "type" is "trend". time of impact, hh:mm:ss
                  // 只有当“型”才是“趋势”。撞击时间，hh：mm：ss
                }
              ], // Array of triggers, same object design as ending_triggers
              // -触发器数组，与 end_triggers 的对象设计相同
              "ending_condition": "any", // "any" or "all"-"任何"或"所有"
              "ending_triggers": [] // array of trigger objects-触发对象数组
            }
          ]
        }
      ] // Array of models, each model is a set of instructions for a specific grow environment
      // -模型数组，每个模型是一组用于特定生长环境的指令
    }
  ]
}
