import { themeBalham } from 'ag-grid-community'
import type {
  ICellRendererParams,
  PaginationNumberFormatterParams,
  ValueGetterParams,
  ValueParserParams,
} from 'ag-grid-community'
import {
  currencyFormatter,
  dateFormatter,
  emptyCellFormatter,
  formatPhoneNumber,
} from '@/utils/helpers'
import USER_FIELDS from '@/entities/user'
import DeleteButtonComponent from '@/features/table/DeleteButtonComponent.vue'

const editMoneyCellConfig = {
  editable: true,
  cellEditor: 'agTextCellEditor',
  cellEditorParams: {
    minLength: 1,
  },
  valueParser: (params: ValueParserParams) => Number(params.newValue),
}

export default {
  theme: themeBalham,
  defaultColDef: {
    filter: true,
    sortable: true,
    valueFormatter: emptyCellFormatter,
  },
  columnDefs: [
    {
      headerName: 'General',
      children: [
        {
          headerName: '№',
          pinned: 'left',
          filter: false,
          width: 70,
          valueGetter: (params: ValueGetterParams) => params.node!.rowIndex! + 1,
        },
        {
          headerName: 'Customer ID',
          field: USER_FIELDS.CUSTOMER_ID,
          cellDataType: 'text',
        },
        {
          headerName: 'Full Name',
          field: USER_FIELDS.FULL_NAME,
          pinned: 'left',
          editable: true,
          cellDataType: 'text',
        },
        {
          headerName: 'Birthday',
          field: USER_FIELDS.BIRTHDAY,
          cellDataType: 'dateString',
          valueFormatter: dateFormatter,
        },
        {
          headerName: 'Gender',
          field: USER_FIELDS.GENDER,
          cellDataType: 'text',
        },
        {
          headerName: 'Email',
          field: USER_FIELDS.EMAIL,
          cellDataType: 'text',
        },
        {
          headerName: 'Phone Number',
          field: USER_FIELDS.PHONE_NUMBER,
          cellDataType: 'text',
          valueFormatter: formatPhoneNumber,
        },
        {
          headerName: 'Address',
          field: USER_FIELDS.ADDRESS,
          cellDataType: 'text',
        },
        {
          headerName: 'City',
          field: USER_FIELDS.CITY,
          cellDataType: 'text',
        },
        {
          headerName: 'Country',
          field: USER_FIELDS.COUNTRY,
          cellDataType: 'text',
        },
        {
          headerName: 'Employment Status',
          field: USER_FIELDS.EMPLOYMENT_STATUS,
          cellDataType: 'text',
        },
      ],
    },
    {
      headerName: 'Account',
      children: [
        {
          headerName: 'ID',
          field: USER_FIELDS.ACCOUNT_ID,
          cellDataType: 'text',
        },
        {
          headerName: 'Type',
          field: USER_FIELDS.ACCOUNT_TYPE,
          cellDataType: 'text',
        },
        {
          headerName: 'Balance',
          field: USER_FIELDS.ACCOUNT_BALANCE,
          pinned: 'right',
          cellDataType: 'number',
          valueFormatter: currencyFormatter,
          ...editMoneyCellConfig,
        },
        {
          headerName: 'Currency',
          field: USER_FIELDS.CURRENCY,
          cellDataType: 'text',
        },
        {
          headerName: 'Open Date',
          field: USER_FIELDS.ACCOUNT_OPEN_DATE,
          cellDataType: 'dateString',
          valueFormatter: dateFormatter,
        },
        {
          headerName: 'Status',
          field: USER_FIELDS.ACCOUNT_STATUS,
          cellDataType: 'text',
        },
      ],
    },
    {
      headerName: 'Transaction',
      children: [
        {
          headerName: 'ID',
          field: USER_FIELDS.TRANSACTION_ID,
          columnGroupShow: 'open',
          cellDataType: 'text',
        },
        {
          headerName: 'Date',
          field: USER_FIELDS.TRANSACTION_DATE,
          cellDataType: 'dateString',
          valueFormatter: dateFormatter,
        },
        {
          headerName: 'Type',
          field: USER_FIELDS.TRANSACTION_TYPE,
          cellDataType: 'text',
        },
        {
          headerName: 'Amount',
          field: USER_FIELDS.TRANSACTION_AMOUNT,
          cellDataType: 'number',
          valueFormatter: currencyFormatter,
          ...editMoneyCellConfig,
        },
        {
          headerName: 'Currency',
          field: USER_FIELDS.TRANSACTION_CURRENCY,
          cellDataType: 'text',
        },
        {
          headerName: 'Balance After Transaction',
          field: USER_FIELDS.BALANCE_AFTER_TRANSACTION,
          cellDataType: 'number',
          valueFormatter: currencyFormatter,
        },
        {
          headerName: 'Method',
          field: USER_FIELDS.TRANSACTION_METHOD,
          cellDataType: 'text',
        },
        {
          headerName: 'Location',
          field: USER_FIELDS.TRANSACTION_LOCATION,
          cellDataType: 'text',
        },
      ],
    },
    {
      headerName: 'Actions',
      filter: false,
      sortable: false,
      resizable: false,
      width: 100,
      cellRendererSelector: (params: ICellRendererParams) => {
        if (params.node.rowPinned === 'bottom') {
          return undefined
        }

        return {
          component: DeleteButtonComponent,
          params,
        }
      },
    },
  ],
  readOnlyEdit: true,
  pagination: true,
  paginationPageSize: 500,
  paginationPageSizeSelector: Array.from({ length: 5 }, (_, i) => (i + 1) * 100),
  paginationNumberFormatter: (params: PaginationNumberFormatterParams) => {
    return '[' + params.value.toLocaleString() + ']'
  },
}
