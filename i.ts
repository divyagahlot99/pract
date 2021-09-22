import { Component} from '@angular/core';
import { StatusCellRendererComponent } from 'src/app/status-cell-renderer/status-cell-renderer.component';
import { ApiService } from './shared/api.service';
import {TooltipCellRendererComponent} from "./tooltip-cell-renderer/tooltip-cell-renderer.component";

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
    // public editType;

    constructor(private api: ApiService) {
        this.rowSelection = 'multiple';
        // this.editType = 'fullRow';
    }

    activityLog: any = []
    rowData: any;
    userData: any;
    ngOnInit(): void {
        this.getAllUser();
        this.getClonedArray();

    }
    onGridReady(params: any) {
        this.gridApi = params.api
        this.columnApi = params.columnApi
    }

    defaultColDef = {
        flex: 1,
        minWidth: 150,
        resizable: true,
        rowMultiSelectWithClick: true,
        rowSelection: 'multiple',
      };
      onFirstDataRendered(params:any) {
        params.api.sizeColumnsToFit();
      }


    // IMP
    getSelectedRowData() {

        let selectedNodes = this.gridApi.getSelectedNodes();
        let selectedData = selectedNodes.map((node:any) => node.data);
        alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
        return selectedData;
    }

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
        if (state === true) {
            // this.gridApi.setFocusedCell(event.rowIndex, 'name');
        } else {
            var t = this.myClonedArray[event.rowIndex]
            var rowNode = this.gridApi.getRowNode(event.rowIndex);
            rowNode.setData({"name": t.name,
                            "loanAmount": t.loanAmount,
                            "gender": t.gender,
                            "statusish": t.statusish});
            // rowNode.setDataValue('name', "rata");
            console.log("Unselected")
            this.gridApi.stopEditing(true)
        }
    }






    hashMapSort = () => {
        var hash:any = {
            "22/01/1999": [
                {"cost": 800},
                {"cost": 600},
                {"cost": 500}],
            "23/01/1999": [
                {"cost": 650},
                {"cost": 699},
                {"cost": 701},
                {"cost": 755}],
            "24/01/1999": [
                {"cost": 711},
                {"cost": 900}
            ]
        }
        var tupleList:any = []
        for (let i in hash) {
            var t = hash[i].map((x:any) => [i, [x.cost, x.name, x.value]])
            for(let j in t) {tupleList.push(t[j])}
        }
        tupleList.sort(function(a:any,b:any){return b[1].cost - a[1].cost});
        console.log(tupleList)
    }
}




// (rowSelected)="onRowSelected($event)"
// [suppressRowClickSelection] = "true"

