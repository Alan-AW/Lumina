import resso from "resso" //import resso

export const update_store = resso({
    instructions: [],
    tabIndex: 0,
})


//数组循环判断更新数据
export const updateArr = (obj: any) => {
    const arr = JSON.parse(JSON.stringify(update_store.instructions))

    for (let objKey in obj) {

        if(objKey==='days_min'){
            arr[update_store.tabIndex].days_min=obj[objKey];
            break;
        }
        if(objKey==='days_max'){
            arr[update_store.tabIndex].days_max=obj[objKey];
            break;
        }
        if(objKey==='duration'){
            arr[update_store.tabIndex].duration=obj[objKey];
            break;
        }

        const actions = arr[update_store.tabIndex].actions;
        for (let index = 0; index < actions.length; index++) {
            const element = actions[index];
            for (let itemKey in element) {
                if (itemKey == objKey) {
                    element[itemKey] = obj[objKey];
                    break;
                }
            }
            
        }
        
    }
    console.log('更新的arr',arr);
    

    update_store.instructions = arr;

}


//滑块值限制
export const settings: any = {
    vpd_priority_day: ['temp', 'rh'],
    vpd_priority_night: ['temp', 'rh'],
    fade_curve_type: ['linear', 'exponential', 'none'],
    target_rh_day: { min: 0.3, max: 0.85, step: 0.01 },
    target_rh_night: { min: 0.3, max: 0.85, step: 0.01 },
    target_vpd_day: { min: 0.3, max: 3.5, step: 0.1 },
    target_vpd_night: { min: 0.3, max: 3.5, step: 0.1 },
    target_amb_temp_day: { min: 8, max: 35, step: 1 },
    target_amb_temp_night: { min: 8, max: 35, step: 1 },
    target_ec: { min: 0.2, max: 3, step: 0.1 },
    target_ph: { min: 2.5, max: 8.5, step: 0.1 },
    target_water_temperature: { min: 12, max: 25, step: 1 },
    spectra_450_led: { min: 0, max: 255, step: 1 },
    spectra_660_led: { min: 0, max: 255, step: 1 },
    spectra_main_led: { min: 0, max: 255, step: 1 },
    fade_curve_duration: { min: '0:00:00', max: '3:00:00' }
};



