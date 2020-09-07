import {Observable} from 'rxjs';


export function mailService(url: string, bodyData: any): Observable<any>{
  return new Observable(observer => {
    fetch(url,
      {
        method: 'PUT',
        body: JSON.stringify(bodyData),
        headers: {
          'Access-Control-Allow-Headers' : 'Content-Type',
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
          'Access-Control-Allow-Credentials': 'true'
          // 'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Methods': 'POST, PUT',
          // 'Access-Control-Allow-Headers': 'Content-Type , Authorization'
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
