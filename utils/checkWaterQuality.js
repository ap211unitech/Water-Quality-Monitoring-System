export const checkWaterQuality = ({ tds, ph, temp }) => {
    if (tds == undefined) {
        if (ph == undefined) {
            if (temp == undefined) {
                return "No readings here. Can't decide"
            }
            else {
                if (temp >= 30) {
                    return "Water is quite hot. Although, TDS is good. It is safe."
                }
                if (temp < 30 && temp >= 20) {
                    return "You can drink it. It's  good for health"
                }
                return "Water is too cold."
            }
        }
        if (ph < 8) {
            if (temp >= 30) {
                return "Water is little hot. Although, TDS is good. It is safe."
            }
            if (temp < 30 && temp >= 20) {
                return "You can drink it. It's  good for health"
            }
            return "Water is too cold."
        }
        else {
            return "Water is too acidic. Don't drink it."
        }
    }
    if (tds >= 50 && tds <= 250) {
        if (ph == undefined) {
            if (temp == undefined) {
                return "You can drink it. It's  good for health"
            }
            else {
                if (temp >= 30) {
                    return "Water is little hot. Although, TDS is good. It is safe."
                }
                if (temp < 30 && temp >= 20) {
                    return "You can drink it. It's  good for health"
                }
                return "Water is too cold. Although, it's TDS is good."
            }
        }
        if (ph < 8) {
            if (temp >= 30) {
                return "Water is little hot. Although, TDS is good. It is safe."
            }
            if (temp < 30 && temp >= 20) {
                return "You can drink it. It's  good for health"
            }
            return "Water is too cold."
        }
        else {
            return "Water is too acidic. Don't drink it."
        }
    }
    else {
        return "Water is not good for health. It's TDS is too high."
    }
}