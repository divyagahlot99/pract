import {Component, ViewChild} from '@angular/core';
import { StatusCellRendererComponent } from 'src/app/status-cell-renderer/status-cell-renderer.component';
import { ApiService } from './shared/api.service';
import { TooltipCellRendererComponent } from "./tooltip-cell-renderer/tooltip-cell-renderer.component";

import {
    Router,
} from '@angular/router'
import {NewPageComponent} from "./new-page/new-page.component";
import {set} from "ag-grid-community/dist/lib/utils/object";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public tooltipShowDelay: any = 0;
    private gridApi: any;
    private columnApi: any;
    public totalPending:number = 0;
    public rowSelection;
    public gridOptions:any;
    public detailCellRendererParams:any;
    public data2: any;


    asideVisible: boolean | undefined;

    constructor(private api: ApiService, private router: Router) {
        this.rowSelection = 'multiple';
        this.asideVisible = api.isSidebarVisible;
        this.detailCellRendererParams = {
            detailGridOptions: {
                rowSelection: 'multiple',
                suppressRowClickSelection: true,
                enableRangeSelection: true,
                pagination: true,
                paginationAutoPageSize: true,
                columnDefs: [
                    {
                        field: 'callId',
                        checkboxSelection: true,
                    },
                    { field: 'id' },
                    {
                        field: 'name',
                        minWidth: 150,
                    },
                    {
                        field: 'duration',
                        valueFormatter: "x.toLocaleString() + 's'",
                    },
                    {
                        field: 'switchCode',
                        minWidth: 150,
                    },
                ],
                defaultColDef: {
                    sortable: true,
                    flex: 1,
                },
            },
            getDetailRowData : (params:any) => {
                this.data2 = api.postRequestToSupervisor({
                    id: 848,
                    name: params.data.name,
                    contact: 9999900000,
                    adhaar: 9999888877776666,
                    pancard: "ABABC1212B",
                    email: "abhishek@gmail.com",
                    status: "approved",
                    loanAmount: 1000000,
                    cibilScore: 875
                }).subscribe(
                    (data:any) => {
                        setTimeout(function () {
                            console.log([data])
                            params.successCallback([data]);
                        }, 100);
                        console.log(data);
                    });

            },
        };

    }
    get isSidebarVisible(): boolean {
        return <boolean>this.api.isSidebarVisible;
    }

    loading1 = false
    loading: undefined | boolean = this.api.getLoadVar();


    activityLog: any = []
    rowData: any;
    userData: any;
    ngOnInit(): void {

        this.getAllUser();
        this.getClonedArray();
        this.hashMapSort();
    }
    onGridReady(params: any) {
        this.gridApi = params.api
        this.columnApi = params.columnApi
        this.gridOptions ={
            context: {
                componentParent: this
            }
        };
    }

    defaultColDef = {
        flex: 1,
        minWidth: 150,
        resizable: true,
        rowMultiSelectWithClick: true,
        rowSelection: 'multiple',
        context: {componentParent: this}

      };
    public params: any;
      onFirstDataRendered(params:any) {
        params.api.sizeColumnsToFit();
          this.params = params;
      }
    updateEmployee(id:any){
//something
        console.log("WHATTTT")
    }


    // IMP
    getSelectedRowData() {

        let selectedNodes = this.gridApi.getSelectedNodes();
        let selectedData = selectedNodes.map((node:any) => node.data);
        alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
        return selectedData;
    }

    columnDefs22 = [
        {
            field: 'name',
            cellRenderer: 'agGroupCellRenderer',
        },
        { field: 'loanAmount' },
        { field: 'gender' },
        {
            field: 'minutes',
        },
    ];

    columnDefs = [
        {
            field: 'id',
            checkboxSelection: true,
            checkboxSelectionFilteredOnly: true,
            minWidth: 50,
            maxWidth: 60
        },
        { field: 'id', sortable: true, filter: true,suppressSizeToFit: true },
        { field: 'name', sortable: true, filter: true ,editable: (params:any) => {
            return params.node.selected
        }},
        {
            field: 'gender',
            cellRenderer: 'statusCellRenderer',
            cellEditor: 'agRichSelectCellEditor',
            cellEditorParams: {
              values: ['New', 'In Progress', 'Resolved'],
              cellRenderer: 'statusCellRenderer',
            },
            editable: (params:any) => {
                return params.node.selected
            }
          },
          { field: 'statusish', sortable: true, filter: true},

      {
        field: "loanAmount",
        cellRenderer: 'tooltipCellRenderer',
        minWidth: 200,
        autoHeight: 200,
          // IMP
          editable: (params:any) => {
              return params.node.selected
          },
      },
      {
        field: "loanAmount",
        tooltipField:  'Address: ',
        tooltipComponentParams: { color: '#ececec' }
      }


    ];

    frameworkComponents = {
        statusCellRenderer: StatusCellRendererComponent,
        tooltipCellRenderer: TooltipCellRendererComponent
    };
    currData: any;


    onCellValueChanged(event:any) {
        // this.gridApi.applyTransaction({ add: this.getAllUser() });
    }
    private myClonedArray:any;

    getAllUser() {
        this.api.getUser()
            .subscribe(res => {
                this.userData = res;
                this.rowData = this.userData;
            })
    }

    // IMP
    getClonedArray() {
        this.api.getUser()
            .subscribe(res => {
                this.myClonedArray = res;
                console.log(this.myClonedArray[0])
            })
    }


    // IMP
    onRowSelected(event:any) {
        this.onRowEditingStarted(event, event.node.selected);
    }

    // IMP
    onRowEditingStarted(event:any, state:any) {
        if (state === false) {
            var t = this.myClonedArray[event.rowIndex]
            var rowNode = this.gridApi.getRowNode(event.rowIndex);
            rowNode.setData({
                            "id": t.id,
                            "name": t.name,
                            "loanAmount": t.loanAmount,
                            "gender": t.gender,
                            "statusish": t.statusish});
            this.gridApi.stopEditing(true)
        }
    }









    public tupleListTemp:any;
    hashMapSort = () => {
        var hash:any = {
            "22/01/1999": [
                {"cost": 800, "type": "P"},
                {"cost": 600, "type": "A"},
                {"cost": 500, "type": "P"}],
            "23/01/1999": [
                {"cost": 650, "type": "P"},
                {"cost": 699, "type": "P"},
                {"cost": 701, "type": "Q"},
                {"cost": 755, "type": "P"}],
            "24/01/1999": [
                {"cost": 711, "type": "Q"},
                {"cost": 900, "type": "P"}
            ]
        }
        var tupleList:any = []
        for (let i in hash) {
            var t = hash[i].map((x:any) => {return {...x, date:i}})
            for(let j in t) {tupleList.push(t[j])}
        }
        this.rowData1 = tupleList;
    }
    public rowData1:any;
    columnDefs2 = [{field: 'date'},{ field: 'cost', sortable: true}]

    postGetLoader() {
        this.animation()
        this.loading = true;

        this.api.postRequestToManager("idyoooo").subscribe((data:any)=>{
            this.loading = false;
            this.router.navigateByUrl('details', { state: {id: "1" , data: data}});
        },
            (error:any) => {
                console.log("Server not working");
                this.loading = false;
            });
    }

    @ViewChild(TooltipCellRendererComponent) child: TooltipCellRendererComponent | undefined;
    @ViewChild(NewPageComponent) child2: NewPageComponent | undefined;

    getOutputValue(selected: boolean) {

        console.log("I should have worked" + selected);
        this.loading = selected;
        this.animation()

    }


    loadingText = "Loading."

    animation() {
        const delay = 0.3;
        let count = 0;
        let l = [".", "..", "..."];
        const limitedInterval = setInterval(() => {
            count ++;
            this.loadingText = "Loading" + l[count%3];
            if (this.loading == false) {
                clearInterval(limitedInterval);
            }
        }, delay * 1000);
    }


}
