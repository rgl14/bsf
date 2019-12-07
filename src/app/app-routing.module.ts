import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { AdminComponent } from './admin/admin.component';
import { SupermasterComponent } from './supermaster/supermaster.component';
import { AgentComponent } from './agent/agent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionreportComponent } from './collectionreport/collectionreport.component';
import { ProfitnlossComponent } from './profitnloss/profitnloss.component';
import { MyledgersComponent } from './myledgers/myledgers.component';
import { MatchesComponent } from './matches/matches.component';
import { TournamentComponent } from './tournament/tournament.component';
import { ClientsComponent } from './clients/clients.component';
import { ManagepasswordComponent } from './managepassword/managepassword.component';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { CreatesuperComponent } from './createsuper/createsuper.component';
import { CreatemasterComponent } from './createmaster/createmaster.component';
import { CreateagentComponent } from './createagent/createagent.component';
import { CreateclientComponent } from './createclient/createclient.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { RecevcashComponent } from './recevcash/recevcash.component';
import { PaycashComponent } from './paycash/paycash.component';
import { UserledgerComponent } from './userledger/userledger.component';
import { CashledgerComponent } from './cashledger/cashledger.component';
import { CoinhistoryComponent } from './coinhistory/coinhistory.component';
import { MatchledgerComponent } from './matchledger/matchledger.component';
import { SuperagentComponent } from './superagent/superagent.component';
import { CreatesuperagentComponent } from './createsuperagent/createsuperagent.component';
import { MatchdashboardComponent } from './matchdashboard/matchdashboard.component';
import { BetslipsComponent } from './betslips/betslips.component';
import { SessionbetslipsComponent } from './sessionbetslips/sessionbetslips.component';
import { LivereportComponent } from './livereport/livereport.component';
import { CompanyreportComponent } from './companyreport/companyreport.component';
import { ClientreportComponent } from './clientreport/clientreport.component';
import { ClientcollectionreportComponent } from './clientcollectionreport/clientcollectionreport.component';
import { SessionearningreportComponent } from './sessionearningreport/sessionearningreport.component';
import { InplaylistComponent } from './inplaylist/inplaylist.component';
import { SportslistComponent } from './sportslist/sportslist.component';
import { ReportslistComponent } from './reportslist/reportslist.component';
import { AgentlistComponent } from './agentlist/agentlist.component';
import { MarketinfoComponent } from './marketinfo/marketinfo.component';
import { SessioninfoComponent } from './sessioninfo/sessioninfo.component';
import { MatchsettlementComponent } from './matchsettlement/matchsettlement.component';
import { MarketsComponent } from './markets/markets.component';
import { MatchsettingComponent } from './matchsetting/matchsetting.component';
import { AdministrationComponent } from './administration/administration.component';
import { NewstickerComponent } from './newsticker/newsticker.component';
import { ImportrateComponent } from './importrate/importrate.component';
import { FancyComponent } from './fancy/fancy.component';
import { BookmakerComponent } from './bookmaker/bookmaker.component';
import { EvenoddComponent } from './evenodd/evenodd.component';
import { BalanceComponent } from './balance/balance.component';
import { BettingComponent } from './betting/betting.component';
import { AddfancyComponent } from './addfancy/addfancy.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AddnewsComponent } from './addnews/addnews.component';
import { SportpnlComponent } from './sportpnl/sportpnl.component';
import { TournamentpnlComponent } from './tournamentpnl/tournamentpnl.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddroleComponent } from './addrole/addrole.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AddsportComponent } from './addsport/addsport.component';
import { AddtournamentComponent } from './addtournament/addtournament.component';
import { AddmatchComponent } from './addmatch/addmatch.component';
import { AddmarketComponent } from './addmarket/addmarket.component';
import { MarketlistComponent } from './marketlist/marketlist.component';
import { MatchlistComponent } from './matchlist/matchlist.component';
import { TournamentlistComponent } from './tournamentlist/tournamentlist.component';
import { SportlistComponent } from './sportlist/sportlist.component';
import { FancyrateComponent } from './fancyrate/fancyrate.component';
import { BmrateComponent } from './bmrate/bmrate.component';
import { UpdatelimitComponent } from './updatelimit/updatelimit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path:'',component:LoginComponent},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'matchsetting', component: MatchsettingComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'newsticker', component: NewstickerComponent },
  { path: 'importrate', component: ImportrateComponent },
  { path: 'betting', component: BettingComponent },
  { path: 'fancy', component: FancyComponent },
  { path: 'addfancy', component: AddfancyComponent },
  { path: 'editfancy/:fancyId', component: AddfancyComponent },
  { path: 'bookmaker', component: BookmakerComponent },
  { path: 'addbook', component: AddbookComponent },
  { path: 'evenodd', component: EvenoddComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'fancy', component: FancyComponent },
  { path: 'tournament', component: TournamentComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'createadmin', component: CreateadminComponent },
  { path: 'supermaster', component: SupermasterComponent },
  { path: 'createsuper', component: CreatesuperComponent },
  { path: 'master', component: MasterComponent },
  { path: 'createmaster', component: CreatemasterComponent },
  { path: 'superagent', component: SuperagentComponent },
  { path: 'createsuperagent', component: CreatesuperagentComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'createagent', component: CreateagentComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'createclient', component: CreateclientComponent },
  { path: 'managepassword', component: ManagepasswordComponent },
  { path: 'collectionreport', component: CollectionreportComponent },
  { path: 'myledger', component: MyledgersComponent },
  { path: 'profitnloss', component: ProfitnlossComponent },
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'recevcash', component: RecevcashComponent },
  { path: 'paycash', component: PaycashComponent },
  { path: 'userledger', component: UserledgerComponent },
  { path: 'cashledger', component: CashledgerComponent },
  { path: 'coinhistory', component: CoinhistoryComponent },
  { path: 'matchledger', component: MatchledgerComponent },
  { path: 'matchdashboard', component: MatchdashboardComponent },
  { path: 'betslips', component: BetslipsComponent },
  { path: 'sessionbetslips', component: SessionbetslipsComponent },
  { path: 'livereport', component: LivereportComponent },
  { path: 'companyreport', component: CompanyreportComponent },
  { path: 'match_settlement', component: MatchsettlementComponent },
  { path: 'clientreport', component: ClientreportComponent },
  { path: 'clientcollectionreport', component: ClientcollectionreportComponent },
  { path: 'sessionearningrepport', component: SessionearningreportComponent },
  { path: 'marketinfo', component: MarketinfoComponent },
  { path: 'sessioninfo', component: SessioninfoComponent },
  { path: 'agentlist', component: AgentlistComponent },
  { path: 'inplaylist', component: InplaylistComponent },
  { path: 'sportslist', component: SportslistComponent },
  { path: 'reportlist', component: ReportslistComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'addnews', component: AddnewsComponent },
  { path: 'sportpnl', component: SportpnlComponent },
  { path: 'tournamentpnl', component: TournamentpnlComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'addrole', component: AddroleComponent },
  { path: 'rolelist', component: RolelistComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'addsport', component: AddsportComponent },
  { path: 'addtournament', component: AddtournamentComponent },
  { path: 'addmatch', component: AddmatchComponent },
  { path: 'addmarket', component: AddmarketComponent },
  { path: 'marketlist', component: MarketlistComponent },
  { path: 'matchlist', component: MatchlistComponent },
  { path: 'tournamentlist', component: TournamentlistComponent },
  { path: 'sportlist', component: SportlistComponent },
  { path: 'fancyrate', component: FancyrateComponent },
  { path: 'bmrate', component: BmrateComponent },
  { path: 'updatelimit', component: UpdatelimitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const componentRouting = [
  HomeComponent,
  TournamentComponent,
  MatchesComponent,
  DashboardComponent,
  AdminComponent,
  CreateadminComponent,
  SupermasterComponent,
  CreatesuperComponent,
  MasterComponent,
  CreatemasterComponent,
  SuperagentComponent,
  CreatesuperagentComponent,
  AgentComponent,
  CreateagentComponent,
  ClientsComponent,
  CreateclientComponent,
  ManagepasswordComponent,
  CollectionreportComponent,
  MyledgersComponent,
  ProfitnlossComponent,
  UserdashboardComponent,
  MatchdashboardComponent,
  RecevcashComponent,
  PaycashComponent,
  UserledgerComponent,
  CashledgerComponent,
  CoinhistoryComponent,
  MatchledgerComponent,
  BetslipsComponent,
  SessionbetslipsComponent,
  LivereportComponent,
  CompanyreportComponent,
  MatchsettlementComponent,
  ClientreportComponent,
  ClientcollectionreportComponent,
  SessionearningreportComponent,
  MarketinfoComponent,
  SessioninfoComponent,
  AgentlistComponent,
  InplaylistComponent,
  SportslistComponent,
  ReportslistComponent,
  MarketsComponent,
  MatchsettingComponent,
  AdministrationComponent,
  NewstickerComponent,
  ImportrateComponent,
  FancyComponent,
  BettingComponent,
  BookmakerComponent,
  EvenoddComponent,
  BalanceComponent,
  AddbookComponent,
  AddfancyComponent,
  AddnewsComponent,
  SportpnlComponent,
  TournamentpnlComponent,
  AdduserComponent,
  AddroleComponent,
  RolelistComponent,
  UserlistComponent,
  AddsportComponent,
  AddtournamentComponent,
  AddmatchComponent,
  AddmarketComponent,
  MarketlistComponent,
  MatchlistComponent,
  TournamentlistComponent,
  SportlistComponent,
  FancyrateComponent,
  BmrateComponent,
  UpdatelimitComponent,
]
