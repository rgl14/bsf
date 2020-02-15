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
import { MarketCtlgComponent } from './market-ctlg/market-ctlg.component';
import { PackageSettingsComponent } from './package-settings/package-settings.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { RulesComponent } from './rules/rules.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MarketanalysisComponent } from './marketanalysis/marketanalysis.component';
import { MarketreportComponent } from './marketreport/marketreport.component';
import { UseranalysisComponent } from './useranalysis/useranalysis.component';
import { ScoreInputComponent } from './score-input/score-input.component';
import { InplaymatchesComponent } from './inplaymatches/inplaymatches.component';
import { BlockedclientsComponent } from './blockedclients/blockedclients.component';
import { DeclaredbetslipComponent } from './declaredbetslip/declaredbetslip.component';
import { DeclaredfancybetslipComponent } from './declaredfancybetslip/declaredfancybetslip.component';


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
  { path: 'editbook/:bookId', component: AddbookComponent },
  { path: 'evenodd', component: EvenoddComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'fancy', component: FancyComponent },
  { path: 'tournament', component: TournamentComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'createadmin', component: CreateadminComponent },
  { path: 'createadmin/:userId', component: CreateadminComponent },
  { path: 'supermaster', component: SupermasterComponent },
  { path: 'supermaster/:userId', component: SupermasterComponent },
  { path: 'createsuper', component: CreatesuperComponent },
  { path: 'createsuper/:userId', component: CreatesuperComponent },
  { path: 'master', component: MasterComponent },
  { path: 'master/:userId', component: MasterComponent },
  { path: 'createmaster', component: CreatemasterComponent },
  { path: 'createmaster/:userId', component: CreatemasterComponent },
  { path: 'superagent', component: SuperagentComponent },
  { path: 'superagent/:userId', component: SuperagentComponent },
  { path: 'createsuperagent', component: CreatesuperagentComponent },
  { path: 'createsuperagent/:userId', component: CreatesuperagentComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'agent/:userId', component: AgentComponent },
  { path: 'createagent', component: CreateagentComponent },
  { path: 'createagent/:userId', component: CreateagentComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/:userId', component: ClientsComponent },
  { path: 'createclient', component: CreateclientComponent },
  { path: 'createclient/:userId', component: CreateclientComponent },
  { path: 'managepassword', component: ManagepasswordComponent },
  { path: 'managepassword/:userId/:name/:userName', component: ManagepasswordComponent },
  { path: 'collectionreport', component: CollectionreportComponent },
  { path: 'myledger', component: MyledgersComponent },
  { path: 'profitnloss', component: ProfitnlossComponent },
  { path: 'userdashboard/:userType/:userId/:userName/:name', component: UserdashboardComponent },
  { path: 'recevcash/:userId/:userName/:name', component: RecevcashComponent },
  { path: 'paycash/:userId/:userName/:name', component: PaycashComponent },
  { path: 'userledger/:userId/:userName/:name', component: UserledgerComponent },
  { path: 'cashledger/:userId/:userName/:name', component: CashledgerComponent },
  { path: 'coinhistory/:userId/:userName/:name', component: CoinhistoryComponent },
  { path: 'matchledger', component: MatchledgerComponent },
  { path: 'matchdashboard/:matchId/:id/:title', component: MatchdashboardComponent },
  { path: 'matchdashboard/:sportBfId/:bfId/:matchId/:title', component: MatchdashboardComponent },
  { path: 'betslips/:sportBfId/:bfId/:title', component: BetslipsComponent },
  { path: 'declaredbetslips/:matchId/:id/:title', component: DeclaredbetslipComponent },
  { path: 'sessionbetslips/:sportBfId/:bfId/:title', component: SessionbetslipsComponent },
  { path: 'declaredsessionbetslips/:matchId/:id/:title', component: DeclaredfancybetslipComponent },
  { path: 'analysismarket/:sportBfId/:bfId/:id/:flag', component: MarketanalysisComponent },
  { path: 'livereport/:sportBfId/:bfId/:id', component: LivereportComponent },
  { path: 'companyreport/:matchId/:id/:title', component: CompanyreportComponent },
  { path: 'match_settlement', component: MatchsettlementComponent },
  { path: 'clientreport/:matchId/:id/:title', component: ClientreportComponent },
  { path: 'clientcollectionreport/:matchId/:title', component: ClientcollectionreportComponent },
  { path: 'sessionearningrepport/:matchId/:title', component: SessionearningreportComponent },
  { path: 'marketinfo', component: MarketinfoComponent },
  { path: 'sessioninfo', component: SessioninfoComponent },
  { path: 'agentlist', component: AgentlistComponent },
  { path: 'inplaylist', component: InplaylistComponent },
  { path: 'sportslist', component: SportslistComponent },
  { path: 'reportlist', component: ReportslistComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'addnews', component: AddnewsComponent },
  { path: 'addnews/:id', component: AddnewsComponent },
  { path: 'sportpnl', component: SportpnlComponent },
  { path: 'tournamentpnl', component: TournamentpnlComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'addrole', component: AddroleComponent },
  { path: 'addrole/:roleId', component: AddroleComponent },
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
  { path: 'markets_ctlg', component: MarketCtlgComponent },
  { path: 'packages', component: PackageSettingsComponent },
  { path: 'create_pckg', component: CreatePackageComponent },
  { path: 'edit_pckg/:packageId', component: CreatePackageComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'marketreport/:sportBfId/:bfId/:title', component: MarketreportComponent },
  { path: 'userAnalysis', component: UseranalysisComponent },
  { path: 'ScoreInput', component: ScoreInputComponent },
  { path: 'AllMatch', component: InplaymatchesComponent },
  { path: 'blockedclient', component: BlockedclientsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
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
  MarketCtlgComponent,
  RulesComponent,
  ChangepasswordComponent,
  MarketanalysisComponent,
  MarketreportComponent,
  UseranalysisComponent,
  ScoreInputComponent,
  InplaymatchesComponent,
  BlockedclientsComponent,
  DeclaredbetslipComponent,
  DeclaredfancybetslipComponent
]
