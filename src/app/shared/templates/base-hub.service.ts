import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class BaseHubService<TEntity, TCreateForm, TUpdateForm> {

  protected connection: HubConnection
  protected entityName: string
  protected url: string

  entities$!: BehaviorSubject<TEntity[]>
  entity$?: BehaviorSubject<TEntity>

  constructor(protected http: HttpClient, hubUrl: string, TEntityName: string) {
    this.entityName = TEntityName;
    this.url = `${environment.apiUrl}/${this.entityName}`;

    const builder: HubConnectionBuilder = new HubConnectionBuilder()
    this.connection = builder
    .withUrl(environment.apiUrl + hubUrl)
    .build();

    // Subscribes for changes to receive from server
    this.connection
    .start()
    .catch(err => console.error('Error while starting hub connection: ' + err));

    this.connection.on(`ReceiveCreate${this.entityName}`, data => {
      this.entity$?.next(data);
    });

    this.connection.on(`ReceiveDelete${this.entityName}`, data => {
      this.entity$?.next(data);
    });

    this.connection.on(`ReceiveGet${this.entityName}`, data => {
      this.entities$.next(data);
    });

    this.connection.on(`ReceiveGet${this.entityName}ById`, data => {
      this.entity$?.next(data);
    });

    this.connection.on(`ReceiveUpdate${this.entityName}`, data => {
      this.entity$?.next(data);
    });
  }

  // Send requests to server
  create(form: TCreateForm): Observable<TEntity> {
    return this.http.post<TEntity>(this.url, form)
  }

  delete(id: number): Observable<TEntity> {
    return this.http.delete<TEntity>(`${this.url}/${id}`)
  }

  get(): Observable<TEntity[]> {
    return this.http.get<TEntity[]>(this.url)
  }

  getById(id: number): Observable<TEntity> {
    return this.http.get<TEntity>(`${this.url}/${id}`)
  }

  update(form: TUpdateForm): Observable<TEntity> {
    return this.http.post<TEntity>(this.url, form)
  }

  /********** Note ***********/

  // On => Server to Client
  // Invoke => Client to Server

  // First, open the connection and ready for the change to receive
  // Second, invoke the methods and send the request to the server

  // HttpClient from @angular/common/http NOT FROM SignalR !!!!!
}
