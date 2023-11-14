import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import st from './index.module.css';

const NotFound = () => {
  const [state, setState] = useState({
    first: 4,  // 第一个数字
    second: 0,  // 第二个数字
    third: 4,  // 第三个数字
    i: 0,  // 计数器
    timeOut: 30,  // 超时时间
    firstI: 60,  // 右侧被循环的总次数
    secondI: 50,  // 中间被循环的总次数
    thirdI: 40  // 左侧被循环的总次数
  });

  const randomNum = () => Math.floor(Math.random() * 9) + 1;

  useEffect(() => {
    const loop1 = setInterval(() => {
      let { first, i, firstI } = state;
      if (i > firstI) {
        setState(prevState => ({ ...prevState, first: 4 }));
        clearInterval(loop1);
      } else {
        first = randomNum();
        i += 1;
        setState(prevState => ({ ...prevState, first, i }));
      }
    }, state.timeOut);
    const loop2 = setInterval(() => {
      let { second, i, secondI } = state;
      if (i > secondI) {
        setState(prevState => ({ ...prevState, second: 0 }));
        clearInterval(loop2);
      } else {
        second = randomNum();
        i += 1;
        setState(prevState => ({ ...prevState, second, i }));
      }
    }, state.timeOut);

    const loop3 = setInterval(() => {
      let { third, i, thirdI } = state;
      if (i > thirdI) {
        setState(prevState => ({ ...prevState, third: 4 }));
        clearInterval(loop3);
      } else {
        third = randomNum();
        i += 1;
        setState(prevState => ({ ...prevState, third, i }));
      }
    }, state.timeOut);

    return () => {
      clearInterval(loop1);
      clearInterval(loop2);
      clearInterval(loop3);
    };
  }, [state]);

  return (
    <div className={st.error}>
      <div className={st.containerFloud}>
        <div style={{ textAlign: 'center' }}>
          <div className={st.containerError404}>
            <div className={st.clip}>
              <div className={st.shadow}>
                <span className={`${st.digit} thirdDigit`}>{state.third}</span>
              </div>
            </div>
            <div className={st.clip}>
              <div className={st.shadow}>
                <span className={`${st.digit} secondDigit`}>{state.second}</span>
              </div>
            </div>
            <div className={st.clip}>
              <div className={st.shadow}>
                <span className={`${st.digit} firstDigit`}>{state.first}</span>
              </div>
            </div>
            <div className={st.msg}>
              OH!
              <span className={st.triangle}></span>
            </div>
            <h2 className={st.h1}>
              很抱歉，你访问的页面找不到了
            </h2>
            <Link to='/login' replace={false} className={st.Tologin}>登陆试试?</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NotFound;