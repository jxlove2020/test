let date = new Date();
let viewMonth;

// 칼렌더 그려주는 함수
const renderCalendar = vMonth => {
  const viewYear = date.getFullYear();

  if (vMonth == undefined) {
    viewMonth = date.getMonth();
  } else {
    viewMonth = vMonth;
  }

  // year-month 값 가져오기
  document.querySelector('.year').textContent = `${viewYear}`;
  document.querySelector('.month').textContent = `${viewMonth + 1}`;

  const prevLast = new Date(viewYear, viewMonth, 0); // 다음 달의 0번째 날을 뽑으면, 지난달의 마지막 날의 Date 객체 생성
  const thisLast = new Date(viewYear, viewMonth + 1, 0); // 다음 달의 0번째 날을 뽑으면, 이번 달의 마지막 날 Date객체 생성

  const PLYMDate = prevLast.getDate(); // 지난 달 마지막 날짜
  const PLYMDay = prevLast.getDay(); // 지난 달 마지막 요일 (0 ~ 6)

  const TLYMDate = thisLast.getDate(); // 이번 달 마지막 날짜
  const TLYMDay = thisLast.getDay(); // 이번 달 마지막 요일

  const PLDate = prevLast.getDate(); // 지난 달 마지막 날짜
  const PLDay = prevLast.getDay(); // 지난 달 마지막 요일 (0 ~ 6)

  const TLDate = thisLast.getDate(); // 이번 달 마지막 날짜
  const TLDay = thisLast.getDay(); // 이번 달 마지막 요일

  console.log('PLDate(지난 달 마지막 날짜)===>', PLDate);
  console.log('PLDay(지난 달 마지막 요일 (0 ~ 6))===>', PLDay);
  console.log('TLDate(이번 달 마지막 날짜)===>', TLDate);
  console.log('TLDay(이번 달 마지막 요일)===>', TLDay);

  // Date 기본 배열 생성
  const prevDates = []; // 지난 달
  const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 이번 달 ( 0 ~ n-1 을 1부터 n 으로 처리 0을 없애주기 위해 slice(1) )
  const nextDates = []; // 다음 달

  // prevDates와, nextDates 단순 반복문으로 처리
  // 지난 달 마지막 요일이 토요일이면 굳이 그려줄 필요 없으므로 토요일이 아니라면 그려줌
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      // 지난달의 마지막 날짜부터  1씩 줄어든 값을 unshift 메서드를 통해 prevDates 배열에 앞쪽으로 계속 채워 넣는 방식
      prevDates.unshift(PLDate - i);
    }
  }
  // 이번 달 마지막 날짜의 요일을 기준으로 필요한 개수를 파악해서 1부터 1씩 증가시키며 nextDates 배열에 하나씩 채워 넣는 방식
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // 현재 달 Date 에 지난달 Date 와 다음달 Date 합치기
  const dates = prevDates.concat(thisDates, nextDates);
  console.log('전체 일정 ==>', dates);
  // 현재 달 Date 정리
  // dates.forEach((date, i) => {
  //   dates[i] = `<div class="date">${date}</div>`;
  // });
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  console.log('firstDateIndex', firstDateIndex);
  console.log('lastDateIndex', lastDateIndex);
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';

    dates[
      i
    ] = `<div class="date" data-value="${date}"><span class="${condition}">${date}</span></div>`;
  });

  // 현재 달 Date 그리기
  document.querySelector('.dates').innerHTML = dates.join('');

  // read 그리기
  // 데이터 가져오기
  const jsonData = {
    data: [
      {
        year: '2022',
        month: '4',
        date: '24',
        title: 'Camp',
        desc: 'go on a picnic',
      },
      {
        year: '2022',
        month: '4',
        date: '25',
        title: 'Camp2',
        desc: 'go on a picnic2',
      },
      {
        year: '2022',
        month: '5',
        date: '1',
        title: 'inline',
        desc: 'play inline',
      },
    ],
  };

  // 오늘 날짜 그리기
  const today = new Date();
  // viewMonth ( + 1 해야 현재 월 )
  console.log('todayViewMonth', viewMonth, 'todayGetMonth', today.getMonth());

  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }

      // 데이터 그리기
      for (let d of jsonData.data) {
        console.log('d', d);
        console.log(viewMonth + 1, Number(d.month), viewYear, Number(d.year));
        console.log(
          viewMonth + 1 === Number(d.month) && viewYear === Number(d.year)
        );

        if (viewMonth + 1 === Number(d.month) && viewYear === Number(d.year)) {
          date.classList.add('readData');
          break;
        }
      }
    }
  } else {
    for (let date of document.querySelectorAll('.this')) {
      // 데이터 그리기
      for (let d of jsonData.data) {
        console.log('d', d);
        console.log(viewMonth + 1, Number(d.month), viewYear, Number(d.year));
        console.log(date.parentNode.dataset.value);

        if (viewMonth + 1 === Number(d.month) && viewYear === Number(d.year)) {
          if (date.parentNode.dataset.value === d.date) {
            date.classList.add('readData');
            break;
          }
        }
      }
    }
  }
};

renderCalendar();

// 지난 달 이동
const prevMonth = () => {
  date.setDate(1); // 이동시 항상 1일로 초기화 하여 다음달로 이동시 발생할 수 있는 문제점 (31일 일경우 다음달 31일이 없다면 에러 발생) 해결
  const prevDateMonth = date.getMonth() - 1;
  date.setMonth(prevDateMonth);
  renderCalendar(prevDateMonth);
};

// 다음 달 이동
const nextMonth = () => {
  date.setDate(1); // 이동시 항상 1일로 초기화 하여 다음달로 이동시 발생할 수 있는 문제점 (31일 일경우 다음달 31일이 없다면 에러 발생) 해결
  const nextDateMonth = date.getMonth() + 1;
  date.setMonth(nextDateMonth);
  renderCalendar(nextDateMonth);
};

// 오늘로 이동
const goToday = () => {
  date = new Date();
  renderCalendar();
};

// 이벤트 위임 통해서 각 div 값 가져오기
const calendarDate = document.querySelector('div.dates');
calendarHandler = event => {
  // console.log(event.currentTarget);
  // console.log(event.target.dataset.value); // console.log(event.target.getAttribute('data-value'));와 같음
  let elem = event.target;
  // console.log(elem.classList.contains('date'));
  while (!elem.classList.contains('date')) {
    elem = elem.parentNode;
    if (elem.nodeName == 'BODY') {
      elem = null;
      return;
    }
  }
  console.log(elem.dataset.value);

  alert(elem.dataset.value + '일');
};
calendarDate.addEventListener('click', calendarHandler);
