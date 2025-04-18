export interface IDropSession {
  id: number;
  unique_code: string;
  guardian_id: number;
  guardianName: string;
  phone: number;
  church_id: number;
  note: string;
  created_at: Date;
  drop_offs: IDropOff[];
  awaitingPickup: boolean;
}

export interface IDropOff {
  id: number;
  drop_session_id: number;
  child_id: number;
  name: string;
  class: string;
  bag_status: boolean;
  note: string;
  drop_off_time: Date;
  created_at: Date;
}
export interface IDropSessionRow {
  dropSession: IDropSession;
  onClick: () => void;
}

export interface IDetailsPanelState {
  noActiveSession: string;
  newDropSession: string;
  dropDetails: string;
  pickupActive: string;
  otp: string;
  confirmOtp: string;
}

export const panelStateKeys: IDetailsPanelState = {
  noActiveSession: "noActiveSession",
  newDropSession: "newDropSession",
  dropDetails: "dropDetails",
  pickupActive: "pickupActive",
  otp: "OTP",
  confirmOtp: "confirmOtp",
};
