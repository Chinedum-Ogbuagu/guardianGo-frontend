export interface IDropSession {
  id: number;
  unique_code: string;
  guardian_id: number;
  guardian_name: string;
  guardian_phone: number;
  church_id: number;
  note: string;
  created_at: Date;
  drop_offs: IDropOff[];
  pickup_status: string;
}

export interface IDropOff {
  id: number;
  drop_session_id: number;
  child_id: number;
  child_name: string;
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
export interface IGuardianWithPhone {
  guardian: {
    name: string;
    phone: string;
  };
  children: [
    {
      name: string;
      class: string;
      bag: boolean;
      note: string;
    }
  ];
}
export interface DropOffChild {
  children: {
    className: string;
    name: string;
    hasBag: boolean;
    note: string;
  };
}
export interface DropOffDTO {
  church_id: number;
  guardian: {
    name: string;
    phone: string;
  };
  children: DropOffChild;
}
