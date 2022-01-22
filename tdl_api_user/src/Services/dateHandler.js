/**
 * 
 * @param {*} d1  
 * @returns {boolean} compares d1 and today, If d2 is overdue, returns true.
 */

export function isOverdue(d){
    const today = new Date();
    const date2 = new Date(d);

    if(new Date(today.setHours(0, 0, 0, 0)).getTime()> date2.getTime()){
        return true
    } else if(today.getYear() < date2.getYear()){
        return false
    } else if(today.getDate() === date2.getDate()){
        return false
    }
}
