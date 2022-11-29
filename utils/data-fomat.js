function add0(m) { return m < 10 ? '0' + m : m }
export default function timeFormat(timeStamp) {
      var time = new Date(timeStamp);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      return y + '-' + add0(m) + '-' + add0(d);
    }