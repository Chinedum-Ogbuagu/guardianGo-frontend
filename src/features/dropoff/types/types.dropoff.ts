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
  photo_url: string;
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
  className: string;
  name: string;
  hasBag: boolean;
  note: string;
}

export interface DropOffDTO {
  phone: string;
  church_id: number;
  guardian: {
    name: string;
    phone: string;
  };
  children: DropOffChild[];
}
export interface PaginatedResponse<T> {
  data: T[];
  total_count: number;
  page: number;
  page_size: number;
}
export interface FormData {
  phone: string;
  guardian: string;
  children: {
    name: string;
    className: string;
    hasBag: boolean;
    note?: string;
  }[];
}
