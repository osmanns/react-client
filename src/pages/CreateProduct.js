import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import Axios from "axios"
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import style from "styled-components"

import Layout from "../components/layout/Layout"
import ScrollTop from "../components/button/ScrollTop"

import "./createStyle.css"

const Main = style.main`
    height: auto;
    padding: 0;
`;
const DropdownGroupFood = style.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

function CreateProduct() {
    const [OptionFoodGroup, setOptionFoodGroup] = useState([]) // ประเภทอาหาร (FoodGroup)
    const [OptionFoodGroupSub, setOptionFoodGroupSub] = useState([]) // ชนิดอาหาร (FoodGroupSub)
    const [optionPackageUnit, setOptionPackageUnit] = useState([]) // หน่วยบรรจุภัณฑ์ (PackageUnit)
    const [optionPackagePerServingSize, setOptionPackagePerServingSize] = useState([]) // หน่วยบริโภค (PackagePerServingSize)

    const [name_th, setNameTH] = useState("") // ชื่อผลิตภัณฑ์ (ไทย)
    const [name_en, setNameEN] = useState("") // ชื่อผลิตภัณฑ์ (อังกฤษ)
    const [foodGroupId, setFoodGroupId] = useState() // ประเภทอาหาร (ไอดี)
    const [foodGroupsubId, setFoodGroupSubId] = useState() // ชนิดอาหาร (ไอดี)
    const [quantity, setQuantity] = useState() // น้ำหนักสุทธิ
    const [packageUnit, setPackageUnit] = useState() // หน่วยบรรจุภัณฑ์
    const [packageUnitId, setPackageUnitId] = useState() // หน่วยบรรจุภัณฑ์
    const [packageServingsize, setPackageServingsize] = useState() // หน่วยบริโภค
    const [packageServingsizeId, setPackageServingsizeId] = useState() // หน่วยบริโภค (ไอดี)

    const [volume, setVOLUME] = useState(); // น้ำหนักสุทธิ
    const [TOTAL_ENERGY, setTOTAL_ENERGY] = useState(); // พลังงาน
    const [ENERGY_FROM_FAT, setENERGY_FROM_FAT] = useState(); // พลังงานจากไขมัน
    const [TOTAL_FAT, setTOTAL_FAT] = useState(); // ไขมัน
    const [SATURATED_FAT, setSATURATED_FAT] = useState(); // ไขมันอิ่มตัว
    const [CHOLESTEROL, setCHOLESTEROL] = useState(); // คอเลสเตอรอล
    const [TOTAL_PROTEIN, setTOTAL_PROTEIN] = useState(); // โปรตีน
    const [TOTAL_CARBOHYDRATES, setTOTAL_CARBOHYDRATES] = useState(); // คาร์โบไฮเดรต
    const [TOTAL_SUGAR, setTOTAL_SUGAR] = useState(); // น้ำตาล
    const [DIETARY_FIBER, setDIETARY_FIBER] = useState(); // ใยอาหาร
    const [SODIUM, setSODIUM] = useState(); // โซเดียม
    const [CALCIUM, setCALCIUM] = useState(); // แคลเซียม
    const [VITAMIN_A, setVITAMIN_A] = useState(); // วิตามินเอ
    const [VITAMIN_B1, setVITAMIN_B1] = useState(); // วิตามินบี 1
    const [VITAMIN_B2, setVITAMIN_B2] = useState(); // วิตามินบี 2
    const [IRON, setIRON] = useState(); // เหล็ก
    const [VITAMIN_C, setVITAMIN_C] = useState(); // วิตามิน C
    const [VITAMIN_D, setVITAMIN_D] = useState(); // วิตามิน D
    const [VITAMIN_E, setVITAMIN_E] = useState(); // วิตามิน E
    const [ZINC, setZINC] = useState(); // สังกะสี
    const [SELENIUM, setSELENIUM] = useState(); // ซีลีเนียม

    useEffect(async () => {
        // const response = await Axios.get('http://localhost:3001/foodgroup');
        const response = await Axios.get('https://foodchoiceapi.herokuapp.com/foodgroup');
        setOptionFoodGroup(response.data)
    }, [])

    useEffect(async () => {
        // const response = await Axios.get('http://localhost:3001/packageunit');
        const response = await Axios.get('https://foodchoiceapi.herokuapp.com/packageunit');
        setOptionPackageUnit(response.data)
    }, [])

    useEffect(async () => {
        // const response = await Axios.get('http://localhost:3001/packageperunit');
        const response = await Axios.get('https://foodchoiceapi.herokuapp.com/packageperunit');
        setOptionPackagePerServingSize(response.data)
    }, [])

    const getFoodgroup = (e) => {  
        // เก็บค่า Food Group ID
        const SubmitFoodGroupId = e.target.value
        setFoodGroupId(SubmitFoodGroupId)
        // const selectedIndex = e.target.options.selectedIndex
        // const group_name = e.target.options[selectedIndex].getAttribute('name')
        // Axios.get('http://localhost:3001/foodgroupsub/'+e.target.value).then(response => {   
        Axios.get('https://foodchoiceapi.herokuapp.com/foodgroupsub/'+e.target.value).then(response => {   
            setOptionFoodGroupSub(response.data)
        })
    }  

    // ! ========================================= Role : แสดงปริมาณอาหารหนึ่งหน่วยบริโภค หน่วยน้ำหนัก หน่วยบรรจุภัณฑ์
    const [recServeingSize, setRecServeingSize] = useState()
    const [recServingSizeUnit, setRecServingSizeUnit] = useState()
    const [recServingsizeValueLow, setRecServingsizeValueLow] = useState();
    const [recServingsizeValueHeigh, setRecServingsizeValueHeigh] = useState();
    const [recServingSizeBetween, setRecServingSizeBetween] = useState();
    const [servingSizeUnit, setServingSizeUnit] = useState()
    
    const showRecommendServeingSize = (e) => {
        // เก็บค่า Food Group Sub ID
        const SubmitFoodGroupSubId = e.target.value
        setFoodGroupSubId(SubmitFoodGroupSubId)

        const selectedFoodGroupSub = e.target.options.selectedIndex
        const selectedSize = e.target.options[selectedFoodGroupSub].getAttribute('size')
        var recServeingSize =  parseInt(selectedSize)
        setRecServeingSize(recServeingSize)

        const recServingsizeValue = parseInt(recServeingSize) // ปริมาณหนึ่งหน่วยบริโภคอ้างอิง
        const recServingsizeValueLow = Math.round(recServingsizeValue - (recServingsizeValue / 2))
        const recServingsizeValueHeigh =  Math.round(recServingsizeValue + (recServingsizeValue / 2))
        setRecServingsizeValueLow(recServingsizeValueLow)
        setRecServingsizeValueHeigh(recServingsizeValueHeigh)
        setRecServingSizeBetween(" - ")

        const selectedUnit = e.target.options.selectedIndex
        const unitId = e.target.options[selectedUnit].getAttribute('unit')
        var quantityUnit =  parseInt(unitId)

        if(quantityUnit === 4) {
            setRecServingSizeUnit("ก.")
            setServingSizeUnit("กรัม")
        }
        else if(quantityUnit === 6) {
            setRecServingSizeUnit("มล.")
            setServingSizeUnit("มิลลิลิตร")
        } 
    }

    const [disabled, setDisabled] = useState(true);
    const handlePackageUnit = (e) => {
        const PackageUnitName = e.target.value
        const selectedPackageUnitId = e.target.options.selectedIndex
        const PackageUnitId = e.target.options[selectedPackageUnitId].getAttribute('id')
        var changeDisabled = disabled
        setPackageUnit(PackageUnitName)
        setPackageUnitId(PackageUnitId)

        if(PackageUnitId >= 1 && PackageUnitId <= 19){
            changeDisabled = false
            setDisabled(changeDisabled);
        }
        else {
            changeDisabled = true
            setDisabled(changeDisabled);
        }   
    }

    const handlePackageServingsize = (e) => {
        const packageServingsizeName = e.target.value
        const selectedPackageServingsizeId = e.target.options.selectedIndex
        const packageServingsizeId = e.target.options[selectedPackageServingsizeId].getAttribute('id')
        setPackageServingsize(packageServingsizeName)
        setPackageServingsizeId(packageServingsizeId)     
    }
 
    // ! ========================================= Role : คำนวณหนึ่งหน่วยบริโภค / จำนวนหน่วยบริโภค
    const [servingSize, setServingSize] = useState() // หนึ่งหน่วยบริโภค
    const [servingSizeWeight, setServingsizeWeight] = useState() // น้ำหนักหนึ่งหน่วยบริโภค
    const [servingPerContrainer, setServingPerContrainer] = useState() // จำนวนหน่วยบริโภค
    const [CalculateDisabled, setCalculateDisabled] = useState(true);
    const [inputServingPerContrainer, setInputServingPerContrainer] = useState();
    const [CalculateValue, setCalculateValue] = useState();
    const [servingPerContrainerText, setServingPerContrainerText] = useState("");

    const HandleServingSize = (e) => {

        const calculateId = e.target.getAttribute('id')
        var changeDisabled = disabled

        if(calculateId == "auto"){
            changeDisabled = true
            setCalculateDisabled(changeDisabled);

            // *? คำนวณจำนวนหน่วยบริโภค
            var foodgroupsubID = parseInt(foodGroupsubId)
            var quantityValue = parseInt(quantity) // น้ำหนักสุทธิ
            var recServingsizeValue = parseInt(recServeingSize) // ปริมาณหนึ่งหน่วยบริโภคอ้างอิง
            var servingPerContrainerValue = 0 // จำนวนหน่วยบริโภคยังไม่ปัดเศษ
            var servingPerContrainerValueRounding = 0 //จำนวนหน่วยบริโภคเทศนิยม 1 ตำแหน่ง

            switch (foodgroupsubID) {
                case 1:
                    if(packageUnitId == 1 || packageUnitId == 2) {
                        if(quantityValue > 0 && quantityValue <= recServingsizeValueHeigh) {
                            servingPerContrainerValue = quantityValue / quantityValue 
                            servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 
                        }
                        else {
                            servingPerContrainerValue = quantityValue / recServingsizeValue 
                            servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 
                        }
                    }
                    else {
                        servingPerContrainerValue = quantityValue / recServingsizeValue 
                        servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 
                    }
                break;
                default:
                    servingPerContrainerValue = quantityValue / recServingsizeValue 
                    servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 
            }

            console.log("น้ำหนักสุทธิ : ", quantityValue)
            console.log("จำนวนหน่วยบริโภค : ", servingPerContrainerValue)
            console.log("จำนวนหน่วยบริโภค ปัดเศษ : ", servingPerContrainerValueRounding)

            if(servingPerContrainerValueRounding < 2) {

                var servingPerContrainerRouding = Math.round(servingPerContrainerValueRounding * 2) / 2;
                var servingSize = 1

                if(servingPerContrainerValueRounding == 0 || servingPerContrainerValueRounding < 1) {
                    servingPerContrainerRouding = 1
                    servingSize = 1
                }
                else if(servingPerContrainerRouding == 1) {
                    servingSize = 1
                }
                else {
                    if(foodgroupsubID >= 1 && foodgroupsubID <= 6) {
                        servingSize = 1
                    }
                    else{
                        servingSize = 1 + "/" + servingPerContrainerRouding
                    }
                }

                setInputServingPerContrainer(servingPerContrainerRouding)
                setServingPerContrainer(servingPerContrainerRouding)
                setServingSize(servingSize)  

                const servingsizeWeightValue = quantityValue / servingPerContrainerRouding
                const servingsizeRouding = Math.round(servingsizeWeightValue)
                setServingsizeWeight(servingsizeRouding)
                setVOLUME(servingsizeRouding)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) : ", servingsizeWeightValue)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) ปัดเศษ : ", servingsizeRouding)

                if(servingPerContrainerValueRounding == servingPerContrainerRouding) {
                    setServingPerContrainerText("")
                }
                else if(servingPerContrainerRouding == 1) {
                    setServingPerContrainerText("")
                }
                else {
                    setServingPerContrainerText("ประมาณ ")
                }

            }  
            else if(servingPerContrainerValueRounding >= 2 && servingPerContrainerValueRounding <= 5) {
    
                var servingPerContrainerRouding = Math.round(servingPerContrainerValueRounding * 2) / 2
                var servingSize = 1

                if(servingPerContrainerValueRounding == 0 || servingPerContrainerValueRounding < 1) {
                    servingPerContrainerRouding = 1
                    servingSize = 1
                }
                else if(servingPerContrainerRouding == 1) {
                    servingSize = 1
                }
                else {
                    if(foodgroupsubID >= 1 && foodgroupsubID <= 6) {
                        servingSize = 1
                    }
                    else{
                        servingSize = 1 + "/" + servingPerContrainerRouding
                    }
                }

                setInputServingPerContrainer(servingPerContrainerRouding)
                setServingPerContrainer(servingPerContrainerRouding)
                setServingSize(servingSize)

                const servingsizeWeightValue = quantityValue / servingPerContrainerRouding
                const servingsizeRouding = Math.round(servingsizeWeightValue)
                setServingsizeWeight(servingsizeRouding)
                setVOLUME(servingsizeRouding)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) : ", servingsizeWeightValue)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) ปัดเศษ : ", servingsizeRouding)

                if(servingPerContrainerValueRounding == servingPerContrainerRouding) {
                    setServingPerContrainerText("")
                }
                else if(servingPerContrainerRouding == 1) {
                    setServingPerContrainerText("")
                }
                else {
                    setServingPerContrainerText("ประมาณ ")
                }
            }
            else {
    
                var servingPerContrainerRouding = Math.round(servingPerContrainerValueRounding)
                var servingSize = 1
    
                // กรณี ค่าที่ได้อยู่กึ่งกลางพอดี เช่น 7.5 ให้ปัดเป็น 7
                if(servingPerContrainerValueRounding == Math.round(servingPerContrainerValueRounding * 2) / 2){
                    servingPerContrainerRouding = Math.floor(servingPerContrainerValueRounding)
                }

                if(servingPerContrainerValueRounding == 0 || servingPerContrainerValueRounding < 1) {
                    servingPerContrainerRouding = 1
                    servingSize = 1
                }
                else if(servingPerContrainerRouding == 1) {
                    servingSize = 1
                }
                else {
                    if(foodgroupsubID >= 1 && foodgroupsubID <= 6) {
                        servingSize = 1
                    }
                    else{
                        servingSize = 1 + "/" + servingPerContrainerRouding
                    }
                }

                setInputServingPerContrainer(servingPerContrainerRouding)
                setServingPerContrainer(servingPerContrainerRouding)
                setServingSize(servingSize)

                const servingsizeWeightValue = quantityValue / servingPerContrainerRouding
                const servingsizeRouding = Math.round(servingsizeWeightValue)
                setServingsizeWeight(servingsizeRouding)
                setVOLUME(servingsizeRouding)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) : ", servingsizeWeightValue)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) ปัดเศษ : ", servingsizeRouding)
            }

            if(servingPerContrainerValueRounding == servingPerContrainerRouding) {
                setServingPerContrainerText("")
            }
            else if(servingPerContrainerRouding == 1) {
                setServingPerContrainerText("")
            }
            else {
                setServingPerContrainerText("ประมาณ ")
            }
        }
        else if(calculateId == "custom") {
            changeDisabled = false
            setCalculateDisabled(changeDisabled);

            // *? คำนวณจำนวนหน่วยบริโภค
            var quantityValue = parseInt(quantity) // น้ำหนักสุทธิ
            var servingPerContrainerValue = 0 // จำนวนหน่วยบริโภคยังไม่ปัดเศษ
            var servingPerContrainerValueRounding = 0 //จำนวนหน่วยบริโภคเทศนิยม 1 ตำแหน่ง
            var servingPerContrainerValueCustom = parseInt(inputServingPerContrainer)

            console.log(servingPerContrainerValueCustom)

            servingPerContrainerValueRounding = servingPerContrainerValueCustom

            console.log("น้ำหนักสุทธิ : ", quantityValue)
            console.log("จำนวนหน่วยบริโภค ปัดเศษ : ", servingPerContrainerValueRounding)

            if(servingPerContrainerValueRounding < 2) {

                var servingPerContrainerRouding = Math.round(servingPerContrainerValueRounding * 2) / 2;
                var servingSize = 1

                if(servingPerContrainerValueRounding == 0 || servingPerContrainerValueRounding < 1) {
                    servingPerContrainerRouding = 1
                    servingSize = 1
                }
                else if(servingPerContrainerRouding == 1) {
                    servingSize = 1
                }
                else {
                    if(foodgroupsubID >= 1 && foodgroupsubID <= 6) {
                        servingSize = 1
                    }
                    else{
                        servingSize = 1 + "/" + servingPerContrainerRouding
                    }
                }

                setServingPerContrainer(servingPerContrainerRouding)
                setServingSize(servingSize)  

                const servingsizeWeightValue = quantityValue / servingPerContrainerRouding
                const servingsizeRouding = Math.round(servingsizeWeightValue)
                setServingsizeWeight(servingsizeRouding)
                setVOLUME(servingsizeRouding)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) : ", servingsizeWeightValue)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) ปัดเศษ : ", servingsizeRouding)

            }  
            else if(servingPerContrainerValueRounding >= 2 && servingPerContrainerValueRounding <= 5) {
                var servingPerContrainerRouding = Math.round(servingPerContrainerValueRounding * 2) / 2
                var servingSize = 1

                if(servingPerContrainerValueRounding == 0 || servingPerContrainerValueRounding < 1) {
                    servingPerContrainerRouding = 1
                    servingSize = 1
                }
                else if(servingPerContrainerRouding == 1) {
                    servingSize = 1
                }
                else {
                    if(foodgroupsubID >= 1 && foodgroupsubID <= 6) {
                        servingSize = 1
                    }
                    else{
                        servingSize = 1 + "/" + servingPerContrainerRouding
                    }
                }

                setInputServingPerContrainer(servingPerContrainerRouding)
                setServingPerContrainer(servingPerContrainerRouding)
                setServingSize(servingSize)

                const servingsizeWeightValue = quantityValue / servingPerContrainerRouding
                const servingsizeRouding = Math.round(servingsizeWeightValue)
                setServingsizeWeight(servingsizeRouding)
                setVOLUME(servingsizeRouding)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) : ", servingsizeWeightValue)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) ปัดเศษ : ", servingsizeRouding)
            }
            else {
                var servingPerContrainerRouding = Math.round(servingPerContrainerValueRounding)
                var servingSize = 1
    
                // กรณี ค่าที่ได้อยู่กึ่งกลางพอดี เช่น 7.5 ให้ปัดเป็น 7
                if(servingPerContrainerValueRounding == Math.round(servingPerContrainerValueRounding * 2) / 2){
                    servingPerContrainerRouding = Math.floor(servingPerContrainerValueRounding)
                }

                if(servingPerContrainerValueRounding == 0 || servingPerContrainerValueRounding < 1) {
                    servingPerContrainerRouding = 1
                    servingSize = 1
                }
                else if(servingPerContrainerRouding == 1) {
                    servingSize = 1
                }
                else {
                    if(foodgroupsubID >= 1 && foodgroupsubID <= 6) {
                        servingSize = 1
                    }
                    else{
                        servingSize = 1 + "/" + servingPerContrainerRouding
                    }
                }

                setInputServingPerContrainer(servingPerContrainerRouding)
                setServingPerContrainer(servingPerContrainerRouding)
                setServingSize(servingSize)

                const servingsizeWeightValue = quantityValue / servingPerContrainerRouding
                const servingsizeRouding = Math.round(servingsizeWeightValue)
                setServingsizeWeight(servingsizeRouding)
                setVOLUME(servingsizeRouding)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) : ", servingsizeWeightValue)
                console.log("หนึ่งหน่วยบริโภค (น้ำหนัก) ปัดเศษ : ", servingsizeRouding)
            }
        }
    }   
    
    // ! ========================================= Role : คำนวณค่าโภชนาการ
    const [productList, setProductList] = useState([]);
    const [TOTAL_ENERGY_PERSERVING, setTOTAL_ENERGY_PERSERVING] = useState();
    const [ENERGY_FROM_FAT_PERSERVING, setENERGY_FROM_FAT_PERSERVING] = useState();
    const [TOTAL_FAT_PERSERVING, setTOTAL_FAT_PERSERVING] = useState();
    const [TOTAL_FAT_PERCENTAGE, setTOTAL_FAT_PERCENTAGE] = useState();
    const [SATURATED_FAT_PERSERVING, setSATURATED_FAT_PERSERVING] = useState();
    const [SATURATED_FAT_PERCENTAGE, setSATURATED_FAT_PERCENTAGE] = useState();
    const [CHOLESTEROL_PERSERVING, setCHOLESTEROL_PERSERVING] = useState();
    const [CHOLESTEROL_PERCENTAGE, setCHOLESTEROL_PERCENTAGE] = useState();
    const [TOTAL_PROTEIN_PERSERVING, setTOTAL_PROTEIN_PERSERVING] = useState();
    const [TOTAL_CARBOHYDRATES_PERSERVING, setTOTAL_CARBOHYDRATES_PERSERVING] = useState();
    const [TOTAL_CARBOHYDRATES_PERCENTAGE, setTOTAL_CARBOHYDRATES_PERCENTAGE] = useState();
    const [TOTAL_SUGAR_PERSERVING, setTOTAL_SUGAR_PERSERVING] = useState();
    const [DIETARY_FIBER_PERSERVING, setDIETARY_FIBER_PERSERVING] = useState();
    const [DIETARY_FIBER_PERCENTAGE, setDIETARY_FIBER_PERCENTAGE] = useState();
    const [SODIUM_PERSERVING, setSODIUM_PERSERVING] = useState();
    const [SODIUM_PERCENTAGE, setSODIUM_PERCENTAGE] = useState();
    const [CALCIUM_PERSERVING, setCALCIUM_PERSERVING] = useState();
    const [VITAMIN_A_PERSERVING, setVITAMIN_A_PERSERVING] = useState();
    const [VITAMIN_B1_PERSERVING, setVITAMIN_B1_PERSERVING] = useState();
    const [VITAMIN_B2_PERSERVING, setVITAMIN_B2_PERSERVING] = useState();
    const [IRON_PERSERVING, setIRON_PERSERVING] = useState();
    const [VITAMIN_C_PERSERVING, setVITAMIN_C_PERSERVING] = useState();
    const [VITAMIN_D_PERSERVING, setVITAMIN_D_PERSERVING] = useState();
    const [VITAMIN_E_PERSERVING, setVITAMIN_E_PERSERVING] = useState();
    const [ZINC_PERSERVING, setZINC_PERSERVING] = useState();
    const [SELENIUM_PERSERVING, setSELENIUM_PERSERVING] = useState();

    const [hide_VITAMIN_C, setHidden_VITAMIN_C] = useState(false);
    const [hide_VITAMIN_D, setHidden_VITAMIN_D] = useState(false);
    const [hide_VITAMIN_E, setHidden_VITAMIN_E] = useState(false);
    const [hide_ZINC, setHidden_ZINC] = useState(false);
    const [hide_SELENIUM, setHidden_SELENIUM] = useState(false);

    const create_calculate = (e) => {
        e.preventDefault();

        Axios.post('https://foodch.kaseamsanth.tk/api/gda', {
            volume: volume,
            TOTAL_ENERGY: TOTAL_ENERGY,
            ENERGY_FROM_FAT: ENERGY_FROM_FAT,
            TOTAL_FAT: TOTAL_FAT,
            SATURATED_FAT: SATURATED_FAT,
            CHOLESTEROL: CHOLESTEROL,
            TOTAL_PROTEIN: TOTAL_PROTEIN,
            TOTAL_CARBOHYDRATES: TOTAL_CARBOHYDRATES,
            TOTAL_SUGAR: TOTAL_SUGAR,
            DIETARY_FIBER: DIETARY_FIBER,
            SODIUM: SODIUM,
            CALCIUM: CALCIUM,
            VITAMIN_A: VITAMIN_A,
            VITAMIN_B1: VITAMIN_B1,
            VITAMIN_B2: VITAMIN_B2,
            IRON: IRON,
            VITAMIN_C: VITAMIN_C,
            VITAMIN_D: VITAMIN_D,
            VITAMIN_E: VITAMIN_E,
            ZINC: ZINC,
            SELENIUM: SELENIUM,
        }).then((response) => {
            setProductList([...productList, {
                volume: volume,
                TOTAL_ENERGY: TOTAL_ENERGY,
                ENERGY_FROM_FAT: ENERGY_FROM_FAT,
                TOTAL_FAT: TOTAL_FAT,
                SATURATED_FAT: SATURATED_FAT,
                CHOLESTEROL: CHOLESTEROL,
                TOTAL_PROTEIN: TOTAL_PROTEIN,
                TOTAL_CARBOHYDRATES: TOTAL_CARBOHYDRATES,
                TOTAL_SUGAR: TOTAL_SUGAR,
                DIETARY_FIBER: DIETARY_FIBER,
                SODIUM: SODIUM,
                CALCIUM: CALCIUM,
                VITAMIN_A: VITAMIN_A,
                VITAMIN_B1: VITAMIN_B1,
                VITAMIN_B2: VITAMIN_B2,
                IRON: IRON,
                VITAMIN_C: VITAMIN_C,
                VITAMIN_D: VITAMIN_D,
                VITAMIN_E: VITAMIN_E,
                ZINC: ZINC,
                SELENIUM: SELENIUM,
            }])
            console.log(response.data)
            setTOTAL_ENERGY_PERSERVING(response.data.TOTAL_ENERGY.per_serving)
            setENERGY_FROM_FAT_PERSERVING(response.data.ENERGY_FROM_FAT.per_serving)
            setTOTAL_FAT_PERSERVING(response.data.TOTAL_FAT.per_serving)
            setTOTAL_FAT_PERCENTAGE(response.data.TOTAL_FAT.thai_rdi_per_serving)
            setSATURATED_FAT_PERSERVING(response.data.SATURATED_FAT.per_serving)
            setSATURATED_FAT_PERCENTAGE(response.data.SATURATED_FAT.thai_rdi_per_serving)
            setCHOLESTEROL_PERSERVING(response.data.CHOLESTEROL.per_serving)
            setCHOLESTEROL_PERCENTAGE(response.data.CHOLESTEROL.thai_rdi_per_serving)
            setTOTAL_PROTEIN_PERSERVING(response.data.TOTAL_PROTEIN.per_serving)
            setTOTAL_CARBOHYDRATES_PERSERVING(response.data.TOTAL_CARBOHYDRATES.per_serving)
            setTOTAL_CARBOHYDRATES_PERCENTAGE(response.data.TOTAL_CARBOHYDRATES.thai_rdi_per_serving)
            setTOTAL_SUGAR_PERSERVING(response.data.TOTAL_SUGAR.per_serving)
            setDIETARY_FIBER_PERSERVING(response.data.DIETARY_FIBER.per_serving)
            setDIETARY_FIBER_PERCENTAGE(response.data.DIETARY_FIBER.thai_rdi_per_serving)
            setSODIUM_PERSERVING(response.data.SODIUM.per_serving)
            setSODIUM_PERCENTAGE(response.data.SODIUM.thai_rdi_per_serving)
            setCALCIUM_PERSERVING(response.data.CALCIUM.thai_rdi_per_serving)
            setVITAMIN_A_PERSERVING(response.data.VITAMIN_A.thai_rdi_per_serving)
            setVITAMIN_B1_PERSERVING(response.data.VITAMIN_B1.thai_rdi_per_serving)
            setVITAMIN_B2_PERSERVING(response.data.VITAMIN_B2.thai_rdi_per_serving)
            setIRON_PERSERVING(response.data.IRON.thai_rdi_per_serving)
            setVITAMIN_C_PERSERVING(response.data.VITAMIN_C.thai_rdi_per_serving)
            setVITAMIN_D_PERSERVING(response.data.VITAMIN_D.thai_rdi_per_serving)
            setVITAMIN_E_PERSERVING(response.data.VITAMIN_E.thai_rdi_per_serving)
            setZINC_PERSERVING(response.data.ZINC.thai_rdi_per_serving)
            setSELENIUM_PERSERVING(response.data.SELENIUM.thai_rdi_per_serving)

            var vit_c = response.data.VITAMIN_C.thai_rdi_per_serving
            var vit_d = response.data.VITAMIN_D.thai_rdi_per_serving
            var vit_e = response.data.VITAMIN_E.thai_rdi_per_serving
            var zinc = response.data.ZINC.thai_rdi_per_serving
            var sele = response.data.SELENIUM.thai_rdi_per_serving

            if(vit_c == "-"){
                setHidden_VITAMIN_C(true)
            }else{
                setHidden_VITAMIN_C(false)
            }

            if(vit_d == "-"){
                setHidden_VITAMIN_D(true)
            }else{
                setHidden_VITAMIN_D(false)
            }

            if(vit_e == "-"){
                setHidden_VITAMIN_E(true)
            }else{
                setHidden_VITAMIN_E(false)
            }

            if(zinc == "-"){
                setHidden_ZINC(true)
            }else{
                setHidden_ZINC(false)
            }

            if(sele == "-"){
                setHidden_SELENIUM(true)
            }else{
                setHidden_SELENIUM(false)
            }
        })
    }

    const create_submit = (e) => {
        e.preventDefault();
        console.log(name_th)
        console.log(name_en)
        console.log(TOTAL_ENERGY)
        // Axios.post('http://localhost:3001/add', {
        // Axios.post('http://localhost:4000/products/CreateProduct', {
        Axios.post('https://foodchoicedata.herokuapp.com/add', {
            name_th: name_th,
            name_en: name_en,
            // foodGroupId: foodGroupId,
            // foodGroupsubId: foodGroupsubId,
            // packageUnitId: packageUnitId,
            // packageServingsizeId: packageServingsizeId,
            // quantity: quantity,
            // TOTAL_ENERGY: TOTAL_ENERGY,
            // ENERGY_FROM_FAT: ENERGY_FROM_FAT,
            // TOTAL_FAT: TOTAL_FAT,
            // SATURATED_FAT: SATURATED_FAT,
            // CHOLESTEROL: CHOLESTEROL,
            // TOTAL_PROTEIN: TOTAL_PROTEIN,
            // TOTAL_CARBOHYDRATES: TOTAL_CARBOHYDRATES,
            // TOTAL_SUGAR: TOTAL_SUGAR,
            // DIETARY_FIBER: DIETARY_FIBER,
            // SODIUM: SODIUM,
            // CALCIUM: CALCIUM,
            // VITAMIN_A: VITAMIN_A,
            // VITAMIN_B1: VITAMIN_B1,
            // VITAMIN_B2: VITAMIN_B2,
            // IRON: IRON,
        }).then((response) => {
            setProductList([...productList,
                {
                    name_th: name_th,
                    name_en: name_en,
                }
            ])
            console.log(response.data)
        })
    }

    const create_image = () => {
        htmlToImage.toJpeg(document.getElementById('download-label'), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'label.jpeg';
            link.href = dataUrl;
            link.click();
        });
    }

    const [Id, setId] = useState()
    const [name, setName] = useState({ name: "" })
    const [fields, setFields] = useState([{ id: "", name: "", value: "" }])
    const [vit1, setVit1] = useState()
    const [vit2, setVit2] = useState()

    function createInputs() {
        return fields.map((field, idx) => 
                <div className="create-nutriiton-feild none">
                    <label>{field.name}</label>
                    <div key={`${field}-${idx}`} className="create-nutriiton-feild-input">
                        <input
                        type="text"
                        placeholder={field.name}  
                        value={field.value || ""}
                        onChange={e => handleChange2(idx, e)}
                        className="create-feild-input"
                        />
                        <span className="create-feild-unit">มิลลิกรัม</span>
                    </div>
                    <button type="button" onClick={() => handleRemove(idx)}>X</button>
                </div>
        );
    }

    const handleChange = (event) => {    
        const selectedId = event.target.options.selectedIndex
        const resultId = event.target.options[selectedId].getAttribute('id')
        setId(resultId)

        const selectedName = event.target.options.selectedIndex
        const resultName = event.target.options[selectedName].getAttribute('name')
        setName(resultName); 

        console.log(resultId," : " ,resultName)

        // const values = [...fields];
        // values.push({ value: "", name: resultName});
        // setFields(values);
        // console.log(values)
    }

    function handleChange2(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
        if(values[i].id == "1"){
            setVit1(values[i].value)
        }
        else if(values[i].id == "2"){
            setVit2(values[i].value)
        }

    }

    function handleAdd() {
        const values = [...fields];
        values.push({ id: Id, name: name, value: ""});
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        if(values[i].id == "1"){
            setVit1("-")
        }
        else if(values[i].id == "2"){
            setVit2("-")
        }
        values.splice(i, 1);
        setFields(values);

    }

    // ===========================================================================

    // const [values, setValues] = useState({val: [{id: null, value: null}]});
    // const [values, setValues] = useState({val: []});

    // function createInputs() {
    //     return values.val.map((val, i) =>
    //         <div className="create-nutriiton-feild">
    //             <label></label>
    //             <div key={i} className="create-nutriiton-feild-input">
    //                 <input
    //                 type="text"
    //                 placeholder=""
    //                 value={val||''}
    //                 className="create-feild-input"
    //                 onChange={handleChangeValue.bind(i)}
    //                 />
    //                 <span className="create-feild-unit">มิลลิกรัม</span>
    //             </div>
    //             <input type='button' value='remove' onClick={removeClick.bind(i)} />
    //         </div>
    //     );
    // }

    // function handleChangeValue(event) {
    //     let vals = [...values.val];
    //     vals[this] = event.target.value;
    //     setValues({val: vals });
    // }

    // const addClick = () => {
    //     setValues({val: [...values.val, '']})
    //     console.log(...values.val)
    // }

    // const removeClick = () => {
    //     let vals = [...values.val];
    //     vals.splice(this,1);
    //     setValues({ val: vals });
    // }   
   
    return (
        <Layout className="createProduct">
            <Main>
                <section className="section-create section"> 
                    <div className="contrainer">
                        <ScrollTop showBelow={400} />

                        <div className="create-title">
                            <div className="">สร้างฉลากโภชนาการ</div>
                            <hr className="line" />
                        </div>

                        <div className="create-contrainer">
                            <div className="create-contrainer-form">
                                <div className="create-contrainer-form-title">
                                    <div className="">แบบฟอร์มกรอกข้อมูลผลิตภัณฑ์</div>
                                    <p>กรุณากรอกรายละเอียดข้อมูลผลิตภัณฑ์และข้อมูลโภชนาการ</p>
                                </div>

                                {/* ============================= ข้อมูลผลิตภัณฑ์ */}
                                <div className="create-contrainer-form-product create-contrainer-form-box">
                                    <div className="create-form-product-title">
                                        <div className="">ข้อมูลผลิตภัณฑ์</div>
                                        <hr className="line" />
                                    </div>
                                    <div className="create-feild">
                                        <label>ชื่อผลิตภัณฑ์ (ไทย)</label>
                                        <input 
                                            type="text" 
                                            className="create-feild-input" 
                                            onChange={(e) => {setNameTH(e.target.value)}}
                                            required 
                                        />
                                    </div>
                                    <div className="create-feild">
                                        <label>ชื่อผลิตภัณฑ์ (อังกฤษ)</label>
                                        <input 
                                            type="text" 
                                            className="create-feild-input" 
                                            onChange={(e) => {setNameEN(e.target.value)}}
                                            required 
                                        />
                                    </div>
                                    
                                    <DropdownGroupFood className="create-feild">
                                        <label>ประเภทอาหาร</label>
                                        <select className="create-feild-select" onChange={getFoodgroup} required>
                                            <option value="">เลือกกลุ่มอาหาร</option>
                                            {OptionFoodGroup.map((val) => (
                                                <option key={val.id} value={val.group_id} name={val.group_name}>
                                                    {val.group_name}
                                                </option>
                                            ))}
                                        </select>
                                    </DropdownGroupFood>

                                    <DropdownGroupFood className="create-feild">
                                        <label>ชนิดอาหาร</label>
                                        <select className="create-feild-select" onChange={showRecommendServeingSize} required>
                                            <option value="">เลือกชนิดอาหาร</option>
                                            {OptionFoodGroupSub.map((val) => (
                                                <option key={val.id} value={val.group_sub_id} size={val.group_sub_servingsize} unit={val.weight_unit_id}>
                                                    {val.group_sub_name}
                                                </option>
                                            ))}
                                        </select>
                                    </DropdownGroupFood>

                                    <label>หน่วยบรรจุภัณฑ์</label>
                                    <div className="create-feild">
                                        <select className="create-feild-select" onChange={handlePackageUnit} name="" id="" required>
                                                <option value="">เลือกหน่วยบรรจุภัณฑ์</option>
                                                {optionPackageUnit.map((val) => (
                                                    <option key={val.id} value={val.package_name} id={val.id}>
                                                        {val.package_name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    
                                
                                    {/* ============================= กำหนดหน่วยบริโภค */}
                                    <div className="">
                                        <div className="">
                                            <h3>กำหนดหน่วยบริโภค</h3>
                                            <hr className="line" />           
                                        </div>

                                        <div className="create-recommend-serveingsize">
                                            <div className="create-recommend-serveingsize-box">
                                                หนึ่งหน่วยบริโภคอ้างอิง : {recServeingSize} {recServingSizeUnit}
                                            </div>
                                            <div className="create-recommend-serveingsize-box">
                                                หนึ่งหน่วยบริโภคที่แนะนำ : {recServingsizeValueLow}{recServingSizeBetween}{recServingsizeValueHeigh} {recServingSizeUnit}
                                            </div>
                                        </div>

                                        <div className="create-feild">
                                            <label>น้ำหนักสุทธิ</label>
                                            <div className="create-information-feild">
                                                <div className="create-information-feild-input">
                                                    <input 
                                                        type="text"
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9,.]$/.test(event.key)) {
                                                              event.preventDefault();
                                                            }
                                                          }
                                                        }
                                                        className="create-feild-input" 
                                                        onChange={(e) => {setQuantity(e.target.value)}}
                                                        // disabled={disabled}
                                                        required 
                                                    />
                                                    <span className="create-feild-unit">{servingSizeUnit}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="create-feild">
                                            <label>จำนวนหน่วยบริโภค</label>
                                            <div className="create-feild-servingspercontainer">
                                                <input type="radio" id="auto" name="type" value="auto" onClick={HandleServingSize}/>
                                                <label htmlFor="auto">คำนวณจากหน่วยอ้างอิง</label>
                                                <input type="radio" id="custom" name="type" value="custom" onClick={HandleServingSize} disabled/>
                                                <label htmlFor="custom" className="not-allow">กำหนดเอง</label> 
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    disabled={CalculateDisabled}
                                                    value={inputServingPerContrainer}
                                                    onChange={(e) => {setInputServingPerContrainer(e.target.value)}}
                                                    required
                                                />
                                                {/* <div className="create-feild-servingspercontainer-recommend">
                                                    <p>(เช่น 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, ...)</p>
                                                </div> */}
                                            </div> 
                                        </div>

                                        <div className="create-information-serveingsize">
                                            <div className="create-show-serveingsize">
                                                <div>หนึ่งหน่วยบริโภค :  {servingSizeWeight} {servingSizeUnit}</div>
                                            </div>
                                            <div className="create-feild">
                                                <label>หน่วยบริโภค</label>
                                                <select className="create-feild-select" name="" id="" onChange={handlePackageServingsize} required>
                                                    <option value="">เลือกหน่วยบริโภค</option>
                                                    {optionPackagePerServingSize.map(val => (
                                                        <option key={val.id} value={val.package_unit_name} id={val.id}>
                                                            {val.package_unit_name}
                                                        </option>
                                                    ))}
                                                    </select>
                                            </div>
                                        </div>
                                                        
                                    </div>
                                </div>

                                {/* ============================= ข้อมูลโภชนาการ */}
                                <div className="create-contrainer-form-nutrition create-contrainer-form-box">

                                    <div className="create-form-nutrition-title">
                                        <div className="">ผลวิเคราะห์สำหรับทำฉลากโภชนาการ (ผลวิเคราะห์คุณค่าทางโภชนาการ ต่อ 100 กรัม)</div>
                                        <hr />
                                    </div>

                                    <div className="">
                                    <form action="" onSubmit={create_calculate}>

                                        <div className="create-nutriiton-feild">
                                            <label>พลังงาน (Energy)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_ENERGY(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กิโลแคลอรี่</span>
                                            </div>              
                                        </div>
                                        
                                        <div className="create-nutriiton-feild">
                                            <label>พลังงานจากไขมัน (Energy from fat)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setENERGY_FROM_FAT(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กิโลแคลอรี่</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ไขมัน (Fat)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_FAT(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ไขมันอิ่มตัว (Saturated fat)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setSATURATED_FAT(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โคเลสเตอรอล (Cholesterol)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setCHOLESTEROL(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โปรตีน (Protein)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_PROTEIN(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>คาร์โบไฮเดรต (Carbohydrates)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_CARBOHYDRATES(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>น้ำตาล (Sugar)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_SUGAR(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ใยอาหาร (Dietary fiber)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setDIETARY_FIBER(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โซเดียม (Sodium)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setSODIUM(e.target.value)}}
                                                    required    
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>แคลเซียม (Calcium)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setCALCIUM(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามินเอ (Vitamin A)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_A(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามินบี 1 (Vitamin B1)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_B1(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามินบี 2 (Vitamin B2)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_B2(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>เหล็ก (IRON)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setIRON(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามินซี (Vitamin C)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_C(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามินดี (Vitamin D)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_D(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามินอี (Vitamin E)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_E(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>สังกะสี (Zinc)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setZINC(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ซีลีเนียม (Selenium)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9,.,-]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }
                                                    }
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setSELENIUM(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>


                                            {/* <div>vit1: {vit1}</div>
                                            <div>vit2: {vit2}</div>
                                        <div className="create-feild">
                                                <select className="create-feild-select" onChange={handleChange}>            
                                                    <option id="0" name="0">เลือกสารอาหาร</option>
                                                    <option id="1" name="Potassium">(Potassium)</option>
                                                    <option id="2" name="Chloride">(Chloride)</option>
                                                    <option id="3" name="Phosphorus">(Phosphorus)</option> */}
                                                    {/* <option id="4" name="">(Magnesium)</option>
                                                    <option id="5" name="">(Manganese)</option>
                                                    <option id="6" name="">(Vitamin D)</option>
                                                    <option id="7" name="">(Vitamin E)</option>
                                                    <option id="8" name="">(Vitamin K1)</option>
                                                    <option id="9" name="">(Vitamin C)</option>
                                                    <option id="10" name="">(Niacin)</option>
                                                    <option id="11" name="">(Vitamin B6)</option>
                                                    <option id="12" name="">(Folic acid)</option>
                                                    <option id="13" name="">(Pantothenic Acid)</option>
                                                    <option id="14" name="">(Vitamin B12)</option>
                                                    <option id="15" name="">(Biotin)</option>
                                                    <option id="16" name="">(Iodine)</option>
                                                    <option id="17" name="">(Copper)</option>
                                                    <option id="18" name="">(Zinc)</option>
                                                    <option id="19" name="">(Selenium)</option>
                                                    <option id="20" name="">(Chromium)</option>
                                                    <option id="21" name="">(Molydenum)</option>
                                                    <option id="22" name="">(Fluoride)</option> */}

                                                {/* </select>
                                                <button type="button" onClick={() => handleAdd()}>
                                                    +
                                                </button>         
                                        </div>
                                        
                                        {createInputs()} */}
                                       
                                        <div className="create-button">
                                            <button type="reset"  className="button-reset">รีเซ็ต</button>
                                            <button type="submit" className="button-calculate">คำนวณ</button>
                                        </div>

                                    </form>
                                    </div>

                                </div>    
                            </div>

                            <div className="create-contrainer-label">
                                <div className="create-contrainer-label-title">
                                    <div className="">ฉลากโภชนาการ</div>
                                    <p>การแสดงฉลากโภชนาการของผลิตภัณฑ์</p>
                                </div>

                                <div className="create-contrainer-label-product create-contrainer-form-box" id="download-label">
                                    <div className="create-label-product-title">
                                        <div className="">ข้อมูลโภชนาการ</div>
                                    </div>
                                    <div className="">
                                        <div className="">

                                            <div className="create-label-product-servingsize">
                                                หนึ่งหน่วยบริโภค : {servingSize} {packageServingsize} <span>(</span>{servingSizeWeight} {servingSizeUnit}<span>)</span>
                                            </div>
                                            <div className="create-label-product-servingpercontrainer">
                                                จำนวนหน่วยบริโภคต่อ<span>{packageUnit}</span> : <span>{servingPerContrainerText}</span><span>{servingPerContrainer}</span>
                                            </div>
                                                    
                                            <hr className="line" />

                                            <div className="">
                                                <div className="create-label-text-bold">คุณค่าทางโภชนาการต่อหนึ่งหน่วย</div>
                                                <div className="create-label-layout-flex-column">
                                                    <div className="">
                                                        <span className="create-label-nutrition-energy create-label-text-bold">พลังงานทั้งหมด</span>
                                                        <span className="create-label-perserving">{TOTAL_ENERGY_PERSERVING}</span>
                                                        <span className="create-label-unit">กิโลแคลอรี่</span>
                                                    </div>
                                                    <div className="">
                                                        <span className="create-label-nutrition-energy">(พลังงานจากไขมัน</span>
                                                        <span className="create-label-perserving">{ENERGY_FROM_FAT_PERSERVING}</span>
                                                        <span>กิโลแคลอรี่)</span>
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            <hr className="line" />
                                            
                                            <div className="create-label-text-right">ร้อยละของปริมาณที่แนะนำต่อวัน*</div>
                                            <div className="">
                                                <div className="create-label-layout-flex">
                                                    <span className="create-label-nutrition-name create-label-text-bold">ไขมันทั้งหมด</span>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{TOTAL_FAT_PERSERVING}</span>
                                                        <span className="">ก.</span>
                                                    </div>

                                                    <div className="create-label-nutrition-percentage">
                                                        <span className="create-label-percentage">{TOTAL_FAT_PERCENTAGE}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <div className="create-label-nutrition-name">
                                                        <span className="create-label-text-align">ไขมันอิ่มตัว</span>
                                                    </div>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{SATURATED_FAT_PERSERVING}</span>
                                                        <span className="">ก.</span>
                                                    </div>

                                                    <div className="create-label-nutrition-percentage">
                                                        <span className="create-label-percentage">{SATURATED_FAT_PERCENTAGE}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <span className="create-label-nutrition-name create-label-text-bold">โคเลสเตอรอล</span>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{CHOLESTEROL_PERSERVING}</span>
                                                        <span className="">มก.</span>
                                                    </div>

                                                    <div className="create-label-nutrition-percentage">
                                                        <span className="create-label-percentage">{CHOLESTEROL_PERCENTAGE}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <span className="create-label-nutrition-name create-label-text-bold">โปรตีน</span>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{TOTAL_PROTEIN_PERSERVING}</span>
                                                        <span className="">ก.</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <span className="create-label-nutrition-name create-label-text-bold">คาร์โบไฮเดรต</span>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{TOTAL_CARBOHYDRATES_PERSERVING}</span>
                                                        <span className="">ก.</span>
                                                    </div>

                                                    <div className="create-label-nutrition-percentage">
                                                        <span className="create-label-percentage">{TOTAL_CARBOHYDRATES_PERCENTAGE}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <div className="create-label-nutrition-name">
                                                        <span className="create-label-text-align">ใยอาหาร</span>
                                                    </div>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{DIETARY_FIBER_PERSERVING}</span>
                                                        <span className="">ก.</span>
                                                    </div>

                                                    <div className="create-label-nutrition-percentage">
                                                        <span className="create-label-percentage">{DIETARY_FIBER_PERCENTAGE}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <div className="create-label-nutrition-name">
                                                        <span className="create-label-text-align">น้ำตาล</span>
                                                    </div>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{TOTAL_SUGAR_PERSERVING}</span>
                                                        <span className="">ก.</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <span className="create-label-nutrition-name create-label-text-bold">โซเดียม</span>
                                                    <div className="create-label-nutrition-perserving">
                                                        <span className="create-label-perserving">{SODIUM_PERSERVING}</span>
                                                        <span className="">มก.</span>
                                                    </div>

                                                    <div className="create-label-nutrition-percentage">
                                                        <span className="create-label-percentage">{SODIUM_PERCENTAGE}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="line" />

                                            <div className="create-label-text-center">ร้อยละของปริมาณที่แนะนำต่อวัน*</div>
                                            <div className="">
                                                <div className="create-label-layout-grid">
                                                    <div className="create-label-nutrition-box">
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">วิตามินเอ</span>
                                                            <span className="create-label-percentage">{VITAMIN_A_PERSERVING}</span>
                                                            <span className="">%</span>
                                                        </div>  
                                                    </div>
                                                    <div className="create-label-nutrition-box">
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">วิตามินบี 1</span>
                                                            <span className="create-label-percentage">{VITAMIN_B1_PERSERVING}</span>
                                                            <span className="">%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box">
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">วิตามินบี 2</span>
                                                            <span className="create-label-percentage">{VITAMIN_B2_PERSERVING}</span>
                                                            <span>%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box">
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">แคลเซียม</span>
                                                            <span className="create-label-percentage">{CALCIUM_PERSERVING}</span>
                                                            <span>%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box">
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">เหล็ก</span>
                                                            <span className="create-label-percentage">{IRON_PERSERVING}</span>
                                                            <span>%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box" hidden={hide_VITAMIN_C}>
                                                    {/* <div className="create-label-nutrition-box" > */}
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold" >วิตามินซี</span>
                                                            <span className="create-label-percentage" >{VITAMIN_C_PERSERVING}</span>
                                                            <span >%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box" hidden={hide_VITAMIN_D}>
                                                    {/* <div className="create-label-nutrition-box" > */}
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold" >วิตามินดี</span>
                                                            <span className="create-label-percentage" >{VITAMIN_D_PERSERVING}</span>
                                                            <span >%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box" hidden={hide_VITAMIN_E}>
                                                    {/* <div className="create-label-nutrition-box"> */}
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">วิตามินอี</span>
                                                            <span className="create-label-percentage">{VITAMIN_E_PERSERVING}</span>
                                                            <span>%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box" hidden={hide_ZINC}>
                                                    {/* <div className="create-label-nutrition-box" > */}
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">สังกะสี</span>
                                                            <span className="create-label-percentage">{ZINC_PERSERVING}</span>
                                                            <span>%</span>
                                                        </div>
                                                    </div>
                                                    <div className="create-label-nutrition-box" hidden={hide_SELENIUM}>
                                                    {/* <div className="create-label-nutrition-box" > */}
                                                        <div className="create-label-layout-flex">
                                                            <span className="create-label-nutrition-name-element create-label-text-bold">ซีลีเนียม</span>
                                                            <span className="create-label-percentage">{SELENIUM_PERSERVING}</span>
                                                            <span>%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="line" />
                                            <div> * ร้อยละของปริมาณสารอาหารที่แนะนำให้บริโภคต่อวันสำหรับคนไทยอายุตั้งแต่ 6 ปีขึ้นไป (Thai RDI) โดยคิดจากความต้องการพลังงานวันละ 2,000 กิโลแคลอรี่ </div>
                                        </div>
                                    </div>         
                                </div>

                                <div className="create-contrainer-form-button">
                                    {/* <div className="create-button-submit">
                                        <button className="button-submit">บันทึก</button>
                                    </div> */}
                                    {/* <div className="create-button-download">
                                        <button onClick={create_image} className="button-download">ดาวน์โหลด</button>
                                    </div> */}
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>              
                </section>
            </Main>
        </Layout>
    )
}

export default CreateProduct
