﻿$(document).ready(function () {
    DataTable();
    LoadComboProduk();
});
function ActionAdd() {
    $("#Modal-Produk").modal('show')
    $("#SimpanProduk").show();
    $("#UpdateProduk").hide();
    $("#DeleteProduk").hide();
}
function DataTable() {
    var myTable = $('#TrmDetailProduk').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTipeProduk.asmx/WS_DataTable",
        data: "{UserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTable.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    if (json[i].Status == "Yes") {
                        var TrxParam = "<span class='badge badge-pill badge-success' style='width: 60px;'>Yes</span>"
                    } else {
                        var TrxParam = "<span class='badge badge-pill badge-danger' style='width: 60px;'>No</span>"
                    }
                    var urlClick =  "<div class='dropdown'>" +
                                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                                    "<div class='dropdown-menu dropdown-menu-right'>" +
                                    "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "')><i class='fa fa-pencil'></i> Edit</a>" +
                                    "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].ID + "')><i class='fa fa-trash'></i> Delete</a>" +
                                    "<div class='dropdown-divider'></div>" +
                                    "</div>" +
                                    "</div>"
                    myTable.row.add([json[i].ID, json[i].Produk, json[i].ProdukDetailName, TrxParam, newDate + ' ' + newTime, urlClick]).draw(false);

                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function LoadComboProduk() {
    var ComboProduk = $('#ComboProduk');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK90'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x, result = "";

            ComboProduk.empty()
            for (i = 0; i < json.length; i++) {
                //if (getParameterByName("id") == "" || getParameterByName("id") == null) {
                result = '<option value="' + json[i].ID + '">' + json[i].Produk + '</option>';
                //} else {
                //    result = '<option value="' + getParameterByName("id") + '" selected=true>' + getParameterByName("id") + '</option>';
                //}
                ComboProduk.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}