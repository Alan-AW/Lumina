import resso from "resso" //import resso

export const testData={
    "data": {
        "tod": "00:52:44",
        "time": "2024-03-31T00:52:44+08:00",
        "type": "instruction_set",
        "version": "0.5A.0",
        "device_id": "8RC4KBZ7",
        "instructions": [
            {
                "days_max": 14,
                "days_min": 7,
                "duration": "12:00:00",
                "phase": "transplant_recovery",
                "actions": [
                    {
                        "type": "action",
                        "hardware": "climate",
                        "vpd_priority_day": "temp",
                        "target_rh_max_day": 0.8,
                        "target_rh_min_day": 0.5,
                        
                        "target_vpd_max_day": 0.7,
                        "target_vpd_min_day": 0.42,
                        "vpd_priority_night": "rh",
                        "target_rh_max_night": 0.8,
                        "target_rh_min_night": 0.5,
                        "target_vpd_max_night": 0.7,
                        "target_vpd_min_night": 0.42,
                        "target_amb_temp_max_day": 28,
                        "target_amb_temp_min_day": 16,
                        "target_amb_temp_max_night": 28,
                        "target_amb_temp_min_night": 16,
                        "target_rh_deadband_max_day": 0.7,
                        "target_rh_deadband_min_day": 0.6,

                        "target_rh_deadband_max_night": 0.7,
                        "target_rh_deadband_min_night": 0.6,
                         "target_vpd_deadband_max_day": 0.66,
                         "target_vpd_deadband_min_day": 0.5,
                        "target_vpd_deadband_max_night": 0.66,
                        "target_vpd_deadband_min_night": 0.5,
                        "target_amb_temp_deadband_max_day": 24,
                        "target_amb_temp_deadband_min_day": 18,
                        "target_amb_temp_deadband_max_night": 24,
                        "target_amb_temp_deadband_min_night": 18
                    },
                    {
                        "type": "action",
                        "hardware": "fertigation",
                        "target_ec_max": 2,
                        "target_ec_min": 0.8,
                        "target_ph_max": 7,
                        "target_ph_min": 5,
                        "target_ec_deadband_max": 1.4,
                        "target_ec_deadband_min": 1.2,
                        "target_ph_deadband_max": 6.5,
                        "target_ph_deadband_min": 5.5,
                        "target_water_temperature_max": 24,
                        "target_water_temperature_min": 15,
                        "target_water_temperature_deadband_max": 22,
                        "target_water_temperature_deadband_min": 18
                    },
                    {
                        "type": "action",
                        "hardware": "lighting",
                        "fade_curve_type": "linear",
                        "spectra_450_led": 50,
                        "spectra_660_led": 50,
                        "spectra_main_led": 100,
                        "fade_curve_duration": "00:30:00"
                    }
                ],

            },
            {
                "phase": "seedling",
                "actions": [
                    {
                        "type": "action",
                        "hardware": "climate",
                        "vpd_priority_day": "temp",
                        "target_rh_max_day": 0.8,
                        "target_rh_min_day": 0.5,
                        "target_vpd_max_day": 0.7,
                        "target_vpd_min_day": 0.42,
                        "vpd_priority_night": "rh",
                        "target_rh_max_night": 0.8,
                        "target_rh_min_night": 0.5,
                        "target_vpd_max_night": 0.7,
                        "target_vpd_min_night": 0.42,
                        "target_amb_temp_max_day": 28,
                        "target_amb_temp_min_day": 16,
                        "target_amb_temp_max_night": 28,
                        "target_amb_temp_min_night": 16,
                        "target_rh_deadband_max_day": 0.7,
                        "target_rh_deadband_min_day": 0.6,
                        "target_vpd_deadband_max_day": 0.66,
                        "target_vpd_deadband_min_day": 0.5,
                        "target_rh_deadband_max_night": 0.7,
                        "target_rh_deadband_min_night": 0.6,
                        "target_vpd_deadband_max_night": 0.66,
                        "target_vpd_deadband_min_night": 0.5,
                        "target_amb_temp_deadband_max_day": 24,
                        "target_amb_temp_deadband_min_day": 18,
                        "target_amb_temp_deadband_max_night": 24,
                        "target_amb_temp_deadband_min_night": 18
                    },
                    {
                        "type": "action",
                        "hardware": "fertigation",
                        "target_ec_max": 2,
                        "target_ec_min": 1,
                        "target_ph_max": 7,
                        "target_ph_min": 5,
                        "target_ec_deadband_max": 1.8,
                        "target_ec_deadband_min": 1.4,
                        "target_ph_deadband_max": 6.5,
                        "target_ph_deadband_min": 5.5,
                        "target_temperature_max": 24,
                        "target_temperature_min": 15,
                        "target_temperature_deadband_max": 22,
                        "target_temperature_deadband_min": 18
                    },
                    {
                        "type": "action",
                        "hardware": "lighting",
                        "fade_curve_type": "linear",
                        "spectra_450_led": 120,
                        "spectra_660_led": 120,
                        "spectra_main_led": 180,
                        "fade_curve_duration": "00:20:00"
                    }
                ],
                "days_max": 90,
                "days_min": 28,
                "duration": "14:00:00",
            }
        ],
        "grow_cycle_id": 21
    },
    "time": "2024-03-31T00:52:44+08:00",
    "version": "0.5A.0",
    "device_id": "8RC4KBZ7",
    "grow_cycle_id": 21
}

export const store=resso(testData)
