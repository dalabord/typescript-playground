const btn = document.querySelector('button');

/**
* Observer presents subscription event
**/
const observer = {
  next: value => console.log('next : '+ value),
  error: error => console.log('err : '+ error),
  complete: () => console.log('complete')
};
const observerSubj = Object.assign({}, observer);
/**
* Observable subscribe to observer 
* create fuction is a flow passively triggered
*/
const observable = Rx.Observable.create(obs => {
    btn.onclick = (event) => {
      obs.next('button clicked followed by observable');
    }
    // obs.next('pipo');
  })
  .throttleTime(1000)
  .map(value => value +'!')
  .subscribe(observer);

const observableBtnHide = Rx.Observable
  .create(obs => {
    console.log('setTimeout triggered');
    setTimeout(() => {
      observable.unsubscribe();
      btn.style.visibility = 'hidden';
    }, 5000);
  })
  .subscribe();

/**
* Subject : observable which can be triggered manually
*/
const subject = new Rx.Subject();
subject.subscribe(observerSubj);
subject.subscribe(observerSubj);
subject.next('subject triggered 2 times manually');
subject.complete();

const input = document.querySelector('input');
Rx.Observable.fromEvent(input, 'input')
  // .map(event => event.target.value) // ! distinct on value, NOT entire event !
  .pluck('target', 'value') // replace the map above
  .debounceTime(2000)
  .distinctUntilChanged()
  .scan((prec, current) => {
    console.log('From "'+ prec +'" to "'+ current +'" ');
    return current;
  })
  .subscribe((value) => console.log(value +' (changed and no action since 2 sec)'));



