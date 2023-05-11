export const checkWaterQuality = ({ tds, ph = null, temp = null }) => {
    if (tds >= 50 && tds <= 250) {
        if (ph == null) {
            if (temp == null) {
                return "You can drink it. It's  good for health"
            }
            else {
                if (temp >= 30) {
                    return "Water is little hot. Although, TDS is good. It is safe."
                }
                return "You can drink it. It's  good for health"
            }
        }
        if (ph < 8) {
            if (temp >= 30) {
                return "Water is little hot. Although, TDS is good. It is safe."
            }
            return "You can drink it. It's  good for health"
        }
        else {
            return "Water is too acidic. Don't drink it."
        }
    }
    else {
        return "Water is not good for health. It's TDS is too high."
    }
}