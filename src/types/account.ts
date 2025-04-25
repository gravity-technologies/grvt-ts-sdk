import { Currency, MarginType } from './currency';

export interface SpotBalance {
  currency: Currency;
  balance: string;
  index_price: string;
}

export interface Position {
  event_time: string;
  sub_account_id: string;
  instrument: string;
  size: string;
  notional: string;
  entry_price: string;
  exit_price: string;
  mark_price: string;
  unrealized_pnl: string;
  realized_pnl: string;
  total_pnl: string;
  roi: string;
  quote_index_price: string;
  est_liquidation_price: string;
}

export interface SubAccount {
  event_time: string;
  sub_account_id: string;
  margin_type: MarginType;
  settle_currency: Currency;
  unrealized_pnl: string;
  total_equity: string;
  initial_margin: string;
  maintenance_margin: string;
  available_balance: string;
  spot_balances: SpotBalance[];
  positions: Position[];
  settle_index_price: string;
}

export interface ApiSubAccountSummaryRequest {
  sub_account_id: string;
}

export interface ApiSubAccountSummaryResponse {
  result: SubAccount;
}

export interface FundingAccountSummary {
  main_account_id: string;
  total_equity: string;
  spot_balances: SpotBalance[];
}

export interface ApiFundingAccountSummaryResponse {
  result: FundingAccountSummary;
}
