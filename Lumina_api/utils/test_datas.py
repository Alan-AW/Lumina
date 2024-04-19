a = [
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    },
    {
        "status": True,
        "code": 200,
        "data": {
            "data": {
                "data": {
                    "thc": {
                        "co2": 465,
                        "vpd": 7.0784398742387165,
                        "humidity": 21,
                        "position": "main_lower",
                        "sensor_id": "main_lower",
                        "main_lower": {
                            "co2": 465,
                            "vpd": 7.184402492062391,
                            "humidity": 19.4,
                            "position": "main_lower",
                            "temperature": 43.6,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "main_upper": {
                            "co2": 499,
                            "vpd": 1.5697771032661492,
                            "humidity": 34.1,
                            "position": "main_upper",
                            "temperature": 20.3,
                            "last_updated": "2024-04-15T00:31:40.236506+0800"
                        },
                        "temperature": 43.7,
                        "last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "lighting": {
                        "plant_uv": False,
                        "last_saved": "2024-04-15T00:31:40.236506+0800",
                        "spectra_uva": False,
                        "spectra_uvb": False,
                        "spectra_uvc": False,
                        "spectra_450_led": 150,
                        "spectra_660_led": 150,
                        "spectra_main_led": 150,
                        "spectra_450_laser": False,
                        "spectra_660_laser": False
                    },
                    "fertigation": {
                        "current_ec": 0.07,
                        "current_ph": 6.84,
                        "ec_alert_max": 4,
                        "ec_alert_min": 0.5,
                        "ph_alert_max": 8,
                        "ph_alert_min": 4,
                        "current_water_temp": 13.5,
                        "current_water_level": 0,
                        "current_last_updated": "2024-04-15T00:31:40.236506+0800"
                    },
                    "solar_irradiance": {
                        "last_updated": "2024-04-15T00:31:40.236506+0800",
                        "solar_irradiance": 0
                    }
                },
                "version": "0.5A.0",
                "deviceId": "8RC4KBZ7",
                "last_updated": "2024-04-15T00:31:40.236506+0800",
                "instruction_set": {
                    "data": {
                        "tod": "12:55:40",
                        "time": "2024-03-30T16:32:40+08:00",
                        "type": "instruction_set",
                        "version": "0.5A.0",
                        "device_id": "8RC4KBZ7",
                        "instructions": [
                            {
                                "phase": "transplant_recovery",
                                "actions": [
                                    {
                                        "type": "action",
                                        "hardware": "climate",
                                        "vpd_priority_day": "temp",
                                        "target_rh_max_day": 0.6,
                                        "target_rh_min_day": 0.43,
                                        "target_vpd_max_day": 0.7,
                                        "target_vpd_min_day": 0.42,
                                        "vpd_priority_night": "rh",
                                        "target_rh_max_night": 0.57,
                                        "target_rh_min_night": 0.46,
                                        "target_vpd_max_night": 0.7,
                                        "target_vpd_min_night": 0.42,
                                        "target_amb_temp_max_day": 28,
                                        "target_amb_temp_min_day": 16,
                                        "target_amb_temp_max_night": 28,
                                        "target_amb_temp_min_night": 16,
                                        "target_rh_deadband_max_day": 0.6,
                                        "target_rh_deadband_min_day": 0.43,
                                        "target_vpd_deadband_max_day": 0.6,
                                        "target_vpd_deadband_min_day": 0.5,
                                        "target_rh_deadband_max_night": 0.57,
                                        "target_rh_deadband_min_night": 0.46,
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
                                        "target_ec_max": 31,
                                        "target_ec_min": 1,
                                        "target_ph_max": 7,
                                        "target_ph_min": 5,
                                        "target_ec_deadband_max": 24,
                                        "target_ec_deadband_min": 1,
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
                                "days_max": 14,
                                "days_min": 7,
                                "duration": "12:00:00"
                            }
                        ],
                        "current_phase": "transplant_recovery",
                        "grow_cycle_id": "18",
                        "current_cycle_start": "2024-03-30T16:32:40+08:00",
                        "current_phase_start": "2024-04-14T23:50:16.342164+0800"
                    },
                    "time": "2024-04-14T23:50:16.342309+0800",
                    "type": "instruction_set",
                    "device_id": "8RC4KBZ7"
                }
            },
            "deviceId": "8RC4KBZ7"
        },
        "info": "",
        "errs": ""
    }
]
