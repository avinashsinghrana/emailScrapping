import {Observable} from 'rxjs';


export function mailService(url: string, bodyData: any): Observable<any>{
  return new Observable(observer => {
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
      .then(datas => {
        return datas.json();
      })
      .then( body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
}
