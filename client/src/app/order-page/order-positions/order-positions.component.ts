import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Position} from "../../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsService} from "../../shared/services/positions.service";
import {switchMap, map} from "rxjs/operators";
import {OrderService} from "../order.service";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute, private positionService: PositionsService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionService.fetch(params['id'])
      }),
      map((positions: Position[]) => {
        return positions.map(position => {
          position.quantity = 1
          return position
        })
      })
    )

  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено х${position.quantity}`)
    this.orderService.add(position)
  }
}