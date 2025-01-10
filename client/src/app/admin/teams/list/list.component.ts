import { NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PaginatorComponent } from '@app/admin/layout/paginator/paginator.component';
import {
  Action,
  Column,
} from '@app/admin/layout/table/interfaces/table.interface';
import { TableComponent } from '@app/admin/layout/table/table.component';
import { RouteService } from '@app/routes.service';
import { TeamsRouteType } from '@config/routes.config';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { BarComponent, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { TeamsService } from '../teams.service';
import { catchError, finalize } from 'rxjs';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';

@Component({
  selector: 'teams-list',
  imports: [
    LayoutPanelModule,
    PaginatorComponent,
    ActionBarModule,
    ButtonComponent,
    BarComponent,
    BarRightDirective,
    NgIf,
    TableComponent,
    RouterLink,
    MessageStripModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<any>;

  teams: any[] = [];

  columns: Column[] = [];
  actions: Action[] = [];

  singlePath: string = '';

  loading = false;
  errorMessage: string = '';

  constructor(
    private teamService: TeamsService,
    private routeService: RouteService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.singlePath = this.routeService.getTeamsPath(TeamsRouteType.Single);

    this.columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
    ];

    this.actions = [
      {
        button: {
          icon: 'edit',
          type: 'transparent',
        },
        command: (team) => this.onEditTeam(team),
      },
      {
        button: {
          type: 'transparent',
          label: 'delete',
        },
        popover: {
          title: 'Delete Team',
          subHeading:
            'This action cannot be undone. Do you want to delete this team?',
        },
        command: (team) => this.onDeleteTeam(team),
      },
    ];

    this.fetchTeams();
  }

  fetchTeams() {
    this.loading = true;
    this.errorMessage = '';

    this.teamService
      .getAll()
      .pipe(
        catchError((error) => {
          this.errorMessage = 'An unexpected error occurred. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.teams = response;
      });
  }

  deleteTeam(id: number) {
    this.loading = true;
    this.errorMessage = '';

    this.teamService
      .delete(id)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'An unexpected error occurred. Please try again.';

          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((response) => {
        this.fetchTeams();
      });
  }

  onEditTeam(team: any) {
    this.router.navigate([`${this.singlePath}`, { id: team.id }]);
  }

  onDeleteTeam(team: any) {
    if (team && team.id) {
      this.deleteTeam(team.id);
    }
  }
}
