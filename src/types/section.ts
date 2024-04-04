export interface RootObject {
  data: Data;
  error: string;
  error_code: string;
  message: string;
  status: string;
  status_code: number;
}

export interface Data {
  rt_update_fields: any[];
  sections: Section[];
}

export interface Section {
  children: SectionChildren[];
  id: number;
  title: string;
  type: string;
}

export interface SectionChildren {
  acc: number;
  content?: Content;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract?: number;
  id_auto_extract_label?: string;
  ignore?: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  org_id?: string;
  p_title: string;
  p_type: string;
  parent_id: number;
  time_spent?: number;
  type: string;
  user_id?: string;
  drop_down_type?: string;
  children?: Child[][][];
  row_count?: number;
  isChecked?: boolean;
  color?: string;
}

export interface Child {
  acc: number;
  content: Content2;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract: number;
  id_auto_extract_label: string;
  ignore: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  p_title: string;
  p_type: string;
  parent_id: number;
  sub_p_id: number;
  sub_p_title: string;
  sub_p_type: string;
  time_spent: number;
  type: string;
  color?: string;
}

export interface Content2 {
  is_valid_format: boolean;
  orig_value: string;
  position: any[];
  value: string;
}

export interface Content {
  confidence: number;
  is_valid_format: boolean;
  orig_value: number | string;
  page: number;
  position: number[];
  position_label?: any[];
  review_required: boolean;
  validation_source: string;
  value: number | string;
}
