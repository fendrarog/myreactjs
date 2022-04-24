// import s from './Settings.module.css';

const Settings: React.FC = () => {
  const luckyСompute = (num: number) => {
    let arr = [...String(num)];
    let luckyObj = arr.reduce((acc, cur) => {
      acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
      return acc;
    }, {});
    console.log(arr);
    console.log(luckyObj);

    let result = Object.keys(luckyObj)
      .filter((key) => +key === luckyObj[key])
      .reduce((res, n) => (res > n ? res : n));
    console.log(result);
    return result;
  };
  let luckyNumber = luckyСompute(1223344445555);
  return (
    <>
      <div>{luckyNumber}</div>
    </>
  );
};

export default Settings;
