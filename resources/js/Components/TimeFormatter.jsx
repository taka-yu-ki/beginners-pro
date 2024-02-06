export default function TimeFormatter({time}) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
      
    if (hours === 0) {
        return `${minutes} 分`;
    } 
    if (minutes === 0) {
        return `${hours} 時間`;
    }
    return `${hours} 時間 ${minutes} 分`;
}