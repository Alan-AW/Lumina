from django.test import TestCase

# 安卓设备设置项默认值
t = [
    {
        'cmd': 'target_ec',
        'desc_cn': '营养液电导率EC',
        'desc_en': 'Nutrient EC',

        'component': 1,
        'step': '0.1',
        'min_value': '0.2',
        'max_value': '2.5',
        'unit_cn': 'mS/cm',
        'unit_en': 'mS/cm'
    },
    {
        'cmd': 'target_ph',
        'desc_cn': '营养液酸碱值pH',
        'desc_en': 'Nutrient pH',

        'component': 1,
        'step': '0.1',
        'min_value': '4.5',
        'max_value': '7.0',
        'unit_cn': '',
        'unit_en': ''
    },
    {
        'cmd': 'target_water_level',
        'desc_cn': '营养液水位',
        'desc_en': 'Reservoir Water Level',

        'component': 1,
        'step': '10%',
        'min_value': '30%',
        'max_value': '100%',
        'unit_cn': '',
        'unit_en': ''
    }, {
        'cmd': 'target_h2o2_concentration',
        'desc_cn': '营养液过氧化氢（3%）',
        'desc_en': 'Nutrient H₂O₂',

        'component': 1,
        'step': '1',
        'min_value': '0',
        'max_value': '10',
        'unit_cn': '毫升/升',
        'unit_en': 'mL/L'
    }, {
        'cmd': 'reservoir_uv',
        'desc_cn': '水箱UV消杀',
        'desc_en': 'Reservoir UV Disinfection',

        'component': 1,
        'step': '1',
        'min_value': '0',
        'max_value': '24',
        'unit_cn': '小时/天',
        'unit_en': 'hr/day'
    },
    {
        'cmd': 'day_night_cycle_hours',
        'desc_cn': '日夜周期',
        'desc_en': 'Day-Night Cycle',

        'component': 1,
        'step': '1',
        'min_value': '0',
        'max_value': '24',
        'unit_cn': '小时',
        'unit_en': 'hours'
    },
    {
        'cmd': 'day_night_cycle_fade',
        'desc_cn': '日夜周期渐变',
        'desc_en': 'Day-Night Fade',

        'component': 1,
        'step': '10',
        'min_value': '0',
        'max_value': '120',
        'unit_cn': '分钟',
        'unit_en': 'mins'
    },
    {
        'cmd': 'target_amb_temp',
        'desc_cn': '环境温度',
        'desc_en': 'Ambient Temperature',

        'component': 1,
        'step': '1',
        'min_value': '8',
        'max_value': '40',
        'unit_cn': '℃',
        'unit_en': '℃'
    },
    {
        'cmd': 'target_amb_rh',
        'desc_cn': '环境湿度',
        'desc_en': 'Ambient Humidity',

        'component': 1,
        'step': '10%',
        'min_value': '20%',
        'max_value': '90%',
        'unit_cn': '',
        'unit_en': ''
    },
    {
        'cmd': 'spectra',
        'desc_cn': '植物灯',
        'desc_en': 'LED Grow Lights',

        'component': 1,
        'step': '',
        'min_value': '',
        'max_value': '',
        'unit_cn': '',
        'unit_en': ''
    },
    {
        'cmd': 'spectra_main_led',
        'desc_cn': '主通道（4000K）',
        'desc_en': 'Main Channel (4000K)',

        'component': 1,
        'step': '50',
        'min_value': '0',
        'max_value': '1200',
        'unit_cn': '微摩尔/秒/平米',
        'unit_en': 'μmol/s/m²'
    },
    {
        'cmd': 'spectra_450_led',
        'desc_cn': 'LED深蓝（450nm）',
        'desc_en': 'Deep Blue (450nm)',

        'component': 1,
        'step': '10',
        'min_value': '0',
        'max_value': '300',
        'unit_cn': '微摩尔/秒/平米',
        'unit_en': 'μmol/s/m²'
    },
    {
        'cmd': 'spectra_660_led',
        'desc_cn': 'LED超红（660nm）',
        'desc_en': 'Hyper Red (660nm)',

        'component': 1,
        'step': '10',
        'min_value': '0',
        'max_value': '500',
        'unit_cn': '微摩尔/秒/平米',
        'unit_en': 'μmol/s/m²'
    },
    {
        'cmd': 'spectra_450_laser',
        'desc_cn': '激光深蓝(450nm)',
        'desc_en': 'Laser Deep Blue (450nm)',

        'component': 2,
        'step': '',
        'min_value': '0',
        'max_value': '1',
        'unit_cn': '',
        'unit_en': ''
    },
    {
        'cmd': 'spectra_660_laser',
        'desc_cn': '激光超红(450nm)',
        'desc_en': 'Laser Hyper Red (660nm)',

        'component': 2,
        'step': '',
        'min_value': '0',
        'max_value': '1',
        'unit_cn': '',
        'unit_en': ''
    },
    {
        'cmd': 'looper_motor',
        'desc_cn': '旋转电机',
        'desc_en': 'Motor',

        'component': 1,
        'step': '1',
        'min_value': '0',
        'max_value': '24',
        'unit_cn': '小时',
        'unit_en': 'hours'
    },
    {
        'cmd': 'sprinkler',
        'desc_cn': '喷淋系统',
        'desc_en': 'Sprinkler',

        'component': 1,
        'step': '5',
        'min_value': '0',
        'max_value': '120',
        'unit_cn': '分钟',
        'unit_en': 'mins'
    },
    {
        'cmd': 'fresh_air_sys',
        'desc_cn': '新风系统',
        'desc_en': 'Fresh Air System',

        'component': 1,
        'step': '1',
        'min_value': '0',
        'max_value': '24',
        'unit_cn': '小时',
        'unit_en': 'hours'
    },
    {
        'cmd': 'target_co2_level',
        'desc_cn': '二氧化碳',
        'desc_en': 'CO₂ Enrichment',

        'component': 1,
        'step': '100',
        'min_value': '400',
        'max_value': '1800',
        'unit_cn': 'ppm',
        'unit_en': 'ppm'
    },
    {
        'cmd': 'plant_uv',
        'desc_cn': '植物UV',
        'desc_en': 'Plant UV Disinfection',

        'component': 1,
        'step': '1',
        'min_value': '5',
        'max_value': '60',
        'unit_cn': '分钟',
        'unit_en': 'mins'
    },
    {
        'cmd': 'air_curtain',
        'desc_cn': '风幕',
        'desc_en': 'Air Curtain',

        'component': 1,
        'step': '1',
        'min_value': '0',
        'max_value': '30',
        'unit_cn': '分钟',
        'unit_en': 'mins'
    }
]
