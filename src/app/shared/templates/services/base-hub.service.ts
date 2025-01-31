import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

export class BaseHubService<TEntity, TCreateForm, TUpdateForm> extends BaseService<TEntity, TCreateForm, TUpdateForm> {

  protected connection: HubConnection

  entities$!: BehaviorSubject<TEntity[]>
  entity$?: BehaviorSubject<TEntity>

  constructor(http: HttpClient, hubUrl: string, entityName: string) {
    super(http);
    this.setApiUrl(entityName)

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

  /********** Note ***********/

  // On => Server to Client
  // Invoke => Client to Server

  // First, open the connection and ready for the change to receive
  // Second, invoke the methods and send the request to the server

  // HttpClient from @angular/common/http NOT FROM SignalR !!!!!
}
