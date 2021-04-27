import React, { useState, useEffect } from 'react';

import Axios from "axios"
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
    const [foodGroupId, setFoodGroupId] = useState() // ID ประเภทอาหาร (FoodGroup)
    const [foodGroupsubId, setFoodGroupSubId] = useState() // ID ชนิดอาหาร (FoodGroupSub)
    const [quantity, setQuantity] = useState() // น้ำหนักสุทธิ
    const [packageUnit, setPackageUnit] = useState() // หน่วยบรรจุภัณฑ์
    const [packageUnitId, setPackageUnitId] = useState() // หน่วยบรรจุภัณฑ์
    const [packageServingsize, setPackageServingsize] = useState() // หน่วยบริโภค
    const [packageServingsizeId, setPackageServingsizeId] = useState() // หน่วยบริโภค
    const [volume, setVOLUME] = useState();
    const [TOTAL_ENERGY, setTOTAL_ENERGY] = useState();
    const [ENERGY_FROM_FAT, setENERGY_FROM_FAT] = useState();
    const [TOTAL_FAT, setTOTAL_FAT] = useState();
    const [SATURATED_FAT, setSATURATED_FAT] = useState();
    const [CHOLESTEROL, setCHOLESTEROL] = useState();
    const [TOTAL_PROTEIN, setTOTAL_PROTEIN] = useState();
    const [TOTAL_CARBOHYDRATES, setTOTAL_CARBOHYDRATES] = useState();
    const [TOTAL_SUGAR, setTOTAL_SUGAR] = useState();
    const [DIETARY_FIBER, setDIETARY_FIBER] = useState();
    const [SODIUM, setSODIUM] = useState();
    const [CALCIUM, setCALCIUM] = useState();
    const [VITAMIN_A, setVITAMIN_A] = useState();
    const [VITAMIN_B1, setVITAMIN_B1] = useState();
    const [VITAMIN_B2, setVITAMIN_B2] = useState();
    const [IRON, setIRON] = useState();

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

    const [productList, setProductList] = useState([]);

    useEffect(async () => {
        const response = await Axios('https://foodchoiceserver.herokuapp.com/foodgroup');
        setOptionFoodGroup(response.data)
    }, [])

    useEffect(async () => {
        const response = await Axios('https://foodchoiceserver.herokuapp.com/packageunit');
        setOptionPackageUnit(response.data)
    }, [])

    useEffect(async () => {
        const response = await Axios('https://foodchoiceserver.herokuapp.com/packageperunit');
        setOptionPackagePerServingSize(response.data)
    }, [])

    const getFoodgroup = (e) => {  
        // เก็บค่า Food Group ID
        const SubmitFoodGroupId = e.target.value
        setFoodGroupId(SubmitFoodGroupId)
        // const selectedIndex = e.target.options.selectedIndex
        // const group_name = e.target.options[selectedIndex].getAttribute('name')
        Axios.get('https://foodchoiceserver.herokuapp.com/foodgroupsub/'+e.target.value).then(response => {   
            setOptionFoodGroupSub(response.data)
        })
    }  

    // ! ========================================= Role : แสดงปริมาณอาหารหนึ่งหน่วยบริโภค หน่วยน้ำหนัก หน่วยบรรจุภัณฑ์
    const [recServeingSize, setRecServeingSize] = useState(0)
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

        console.log(packageServingsizeId)
        
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
                        if(quantityValue > 0 && quantityValue <= (recServingsizeValueHeigh)) {
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
                case 17:
                    if(quantityValue > 0 && quantityValue <= (recServingsizeValueHeigh)) {
                        servingPerContrainerValue = quantityValue / quantityValue 
                        servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 
                    }
                break;
                case 18:
                    if(quantityValue > 0 && quantityValue <= (recServingsizeValueHeigh)) {
                        servingPerContrainerValue = quantityValue / quantityValue 
                        servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 
                    }
                break;
                case 19:
                    if(quantityValue > 0 && quantityValue <= (recServingsizeValueHeigh)) {
                        servingPerContrainerValue = quantityValue / quantityValue 
                        servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 
                    }
                break;
                case 20:
                    if(quantityValue > 0 && quantityValue <= (recServingsizeValueHeigh)) {
                        servingPerContrainerValue = quantityValue / quantityValue 
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
                console.log(servingPerContrainerText)

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
                console.log(servingPerContrainerText)
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
            console.log(servingPerContrainerText)
        }
        else if(calculateId == "custom") {
            changeDisabled = false
            setCalculateDisabled(changeDisabled);

            // *? คำนวณจำนวนหน่วยบริโภค
            var foodgroupsubID = parseInt(foodGroupsubId)
            var quantityValue = parseInt(quantity) // น้ำหนักสุทธิ
            var recServingsizeValue = parseInt(recServeingSize) // ปริมาณหนึ่งหน่วยบริโภคอ้างอิง
            var servingPerContrainerValue = 0 // จำนวนหน่วยบริโภคยังไม่ปัดเศษ
            var servingPerContrainerValueRounding = 0 //จำนวนหน่วยบริโภคเทศนิยม 1 ตำแหน่ง

            servingPerContrainerValue = quantityValue / recServingsizeValue 
            servingPerContrainerValueRounding = Number(servingPerContrainerValue.toFixed(1)) 

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
    
    // ! ========================================= Role : บันทึกข้อมูล
    const [perserving_text, setPerserving_text] = useState("น้อยกว่า ")
    const create_calculate = (e) => {
           e.preventDefault();
            // Axios.post('http://localhost:3001/add', {
            // Axios.post('http://localhost:4000/products/CreateProduct', {
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
            }
        ])
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

            var CALCIUM = response.data.CALCIUM.per_serving
            var CALCIUM_parseInt = Number(CALCIUM)
            var CALCIUM_PERSERVING = Number(CALCIUM_parseInt.toFixed(0));
            console.log(CALCIUM)
            console.log(CALCIUM_parseInt)
            console.log(CALCIUM_PERSERVING)
            if(CALCIUM_PERSERVING < 0.15){
                CALCIUM_PERSERVING = 0
            }
            else if(CALCIUM_PERSERVING >= 1.5 && CALCIUM_PERSERVING < 2){
                CALCIUM_PERSERVING = 2
            }
            else if(CALCIUM_PERSERVING >= 2 && CALCIUM_PERSERVING < 10){
                Math.round()
            }
            else if(CALCIUM_PERSERVING >= 10 && CALCIUM_PERSERVING < 50){

            }
            else {

            }

            var VITAMIN_A = response.data.VITAMIN_A.per_serving
            var VITAMIN_A_parseInt = Number(VITAMIN_A)
            var VITAMIN_A_PERSERVING = Number(VITAMIN_A_parseInt.toFixed(0));
            if(VITAMIN_A_PERSERVING < 0.15){
                CALCIUM_PERSERVING = 0
            }
            else if(VITAMIN_A_PERSERVING >= 1.5 && VITAMIN_A_PERSERVING < 2){
                VITAMIN_A_PERSERVING = 2
            }
            else if(VITAMIN_A_PERSERVING >= 2 && VITAMIN_A_PERSERVING < 10){
                Math.round()
            }
            else if(VITAMIN_A_PERSERVING >= 10 && VITAMIN_A_PERSERVING < 50){

            }
            else {

            }

            var VITAMIN_B1 = response.data.VITAMIN_B1.per_serving
            var VITAMIN_B1_parseInt = Number(VITAMIN_B1)
            var VITAMIN_B1_PERSERVING = Number(VITAMIN_B1_parseInt.toFixed(0));
            if(VITAMIN_B1_PERSERVING < 0.15){
                CALCIUM_PERSERVING = 0
            }
            else if(VITAMIN_B1_PERSERVING >= 1.5 && VITAMIN_B1_PERSERVING < 2){
                VITAMIN_B1_PERSERVING = 2
            }
            else if(VITAMIN_B1_PERSERVING >= 2 && VITAMIN_B1_PERSERVING < 10){
                Math.round()
            }
            else if(VITAMIN_B1_PERSERVING >= 10 && VITAMIN_B1_PERSERVING < 50){

            }
            else {

            }

            var VITAMIN_B2 = response.data.VITAMIN_B2.per_serving
            var VITAMIN_B2_parseInt = Number(VITAMIN_B2)
            var VITAMIN_B2_PERSERVING = Number(VITAMIN_B2_parseInt.toFixed(0));
            if(VITAMIN_B2_PERSERVING < 0.15){
                VITAMIN_B2_PERSERVING = 0
            }
            else if(VITAMIN_B2_PERSERVING >= 1.5 && VITAMIN_B2_PERSERVING < 2){
                VITAMIN_B2_PERSERVING = 2
            }
            else if(VITAMIN_B2_PERSERVING >= 2 && VITAMIN_B2_PERSERVING < 10){
                Math.round()
            }
            else if(VITAMIN_B2_PERSERVING >= 10 && VITAMIN_B2_PERSERVING < 50){

            }
            else {

            }

            var IRON = response.data.IRON.per_serving
            var IRON_parseInt = Number(IRON)
            var IRON_PERSERVING = Number(IRON_parseInt.toFixed(0));
            if(IRON_PERSERVING < 0.15){
                IRON_PERSERVING = 0
            }
            else if(IRON_PERSERVING >= 1.5 && IRON_PERSERVING < 2){
                IRON_PERSERVING = 2
            }
            else if(IRON_PERSERVING >= 2 && IRON_PERSERVING < 10){
                Math.round()
            }
            else if(IRON_PERSERVING >= 10 && IRON_PERSERVING < 50){

            }
            else {

            }

            setCALCIUM_PERSERVING(VITAMIN_A_PERSERVING)
            setVITAMIN_A_PERSERVING(VITAMIN_A_PERSERVING)
            setVITAMIN_B1_PERSERVING(VITAMIN_B1_PERSERVING)
            setVITAMIN_B2_PERSERVING(VITAMIN_B2_PERSERVING)
            setIRON_PERSERVING(IRON_PERSERVING)
        })
    }

    const create_submit = (e) => {
        e.preventDefault();
        console.log(name_th)
        console.log(name_en)
        Axios.post('https://foodchoiceserver.herokuapp.com/add', {
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
                                                        className="create-feild-input" 
                                                        onChange={(e) => {setQuantity(e.target.value)}}
                                                        disabled={disabled}
                                                        required 
                                                    />
                                                    <span className="create-feild-unit">{servingSizeUnit}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="create-feild">
                                            <label>จำนวนหน่วยบริโภค</label>
                                            <div className="create-feild-servingspercontainer">       
                                                <input type="radio" id="auto" value="auto" onClick={HandleServingSize}/>
                                                <label for="auto">คำนวณจากหน่วยอ้างอิง</label>
                                                <input type="radio" id="custom" value="custom" onClick={HandleServingSize} disabled/>
                                                <label for="custom">กำหนดเอง</label>
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

                                        <div className="create-nutriiton-feild">
                                            <label>พลังงานทั้งหมด</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_ENERGY(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กิโลแคลอรี่</span>
                                            </div>              
                                        </div>
                                        
                                        <div className="create-nutriiton-feild">
                                            <label>พลังงานจากไขมัน</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setENERGY_FROM_FAT(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กิโลแคลอรี่</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ไขมันทั้งหมด</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_FAT(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ไขมันอิ่มตัว</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setSATURATED_FAT(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โคเลสเตอรอล</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setCHOLESTEROL(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โปรตีน</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_PROTEIN(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>คาร์โบไฮเดรต</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_CARBOHYDRATES(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>น้ำตาล</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setTOTAL_SUGAR(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        {/* <div className="create-nutriiton-feild">
                                            <label>แลคโตส</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ซูโครส</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>น้ำตาลโมเลกุลเดี่ยว/คู่</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div> */}
                                        <div className="create-nutriiton-feild">
                                            <label>ใยอาหาร</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setDIETARY_FIBER(e.target.value)}} 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div>


                                        {/* <div className="create-nutriiton-feild">
                                            <label>แร่ธาตุ (ASH)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div> */}
                                        <div className="create-nutriiton-feild">
                                            <label>โซเดียม</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setSODIUM(e.target.value)}}
                                                    required    
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        {/* <div className="create-nutriiton-feild">
                                            <label>โพแทสเซียม</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>คลอไรด์</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div> */}
                                        <div className="create-nutriiton-feild">
                                            <label>แคลเซียม</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setCALCIUM(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        {/* <div className="create-nutriiton-feild">
                                            <label>ฟอสฟอรัส</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>แมกนีเซียม</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>แมงกานีส</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ความชื้น</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">กรัม</span>
                                            </div>
                                        </div> */}

                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน A</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_A(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">IU</span>
                                            </div>
                                        </div>
                                        {/* <div className="create-nutriiton-feild">
                                            <label>วิตามิน D</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">IU</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน E</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">IU</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน K1</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน C</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div> */}
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน B1</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_B1(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน B2</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setVITAMIN_B2(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        {/* <div className="create-nutriiton-feild">
                                            <label>ไนอาซิน</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน B6</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>กรดโฟลิค</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>กรดแพนโทเธนิค</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>วิตามิน B12</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ไบโอติน</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div> */}
                                        <div className="create-nutriiton-feild">
                                            <label>เหล็ก</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    onChange={(e) => {setIRON(e.target.value)}}
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        {/* <div className="create-nutriiton-feild">
                                            <label>ไอโอดีน</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ทองแดง</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>สังกะสี</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ซีลีเนียม</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โครเมียม</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โมลิบดีนัม</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>ฟลูออไรด์</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">ไมโครกรัม</span>
                                            </div>
                                        </div> */}


                                        {/* <div className="create-nutriiton-feild">
                                            <label>ทอรีน (กรดอะมิโนซัลโฟนิก)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>                         
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>โคลีน (สารอาหารกลุ่มของวิตามินบี)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>อิโนซิทอล (สารอาหารกลุ่มวิตามินบีรวม)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>แอลคาร์นิทีน</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>กรดลิโนเลนิก (กรดไขมันในกลุ่มโอเมกา 3)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>กรดลิโนเลอิก (กรดไขมันในกลุ่มโอเมกา 6)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div>
                                        <div className="create-nutriiton-feild">
                                            <label>กรดโอเลอิก (กลุ่มไขมันไม่อิ่มตัวเชิงเดี่ยวโอเมกา 9)</label>
                                            <div className="create-nutriiton-feild-input">
                                                <input 
                                                    type="text" 
                                                    className="create-feild-input" 
                                                    required 
                                                />
                                                <span className="create-feild-unit">มิลลิกรัม</span>
                                            </div>
                                        </div> */}
                                        <div className="create-button">
                                            <button onClick={create_calculate} className="button-calculate">คำนวณ</button>
                                        </div>
                                    </div>
                                </div>    
                            </div>

                            <div className="create-contrainer-label">
                                <div className="create-contrainer-label-title">
                                    <div className="">ฉลากโภชนาการ</div>
                                    <p>การแสดงฉลากโภชนาการของผลิตภัณฑ์</p>
                                </div>

                                <div className="create-contrainer-label-product create-contrainer-form-box">
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
                                                <div className="create-label-layout-flex">
                                                    <div className="">
                                                        <span className="create-label-nutrition-energy create-label-text-bold">พลังงานทั้งหมด</span>
                                                        <span className="create-label-perserving">{TOTAL_ENERGY_PERSERVING}</span>
                                                        <span className="create-label-unit">กิโลแคลอรี่</span>
                                                    </div>
                                                    {/* {productServingSize.map(val => (
                                                        <span>
                                                            {val.per_serving_volume}
                                                        </span>
                                                    ))} */}
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

                                            <div className="create-label-text-right">ร้อยละของปริมาณที่แนะนำต่อวัน*</div>
                                            <div className="">
                                                <div className="create-label-layout-flex">
                                                    <div className="create-label-nutrition-box">
                                                        <span className="create-label-nutrition-name create-label-text-bold">วิตามินเอ</span>
                                                        <span className="create-label-percentage">{VITAMIN_A_PERSERVING}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                    <div className="create-label-nutrition-box">
                                                        <span className="create-label-nutrition-name create-label-text-bold">วิตามินบี 1</span>
                                                        <span className="create-label-percentage">{VITAMIN_B1_PERSERVING}</span>
                                                        <span className="">%</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <div className="create-label-nutrition-box">
                                                        <span className="create-label-nutrition-name create-label-text-bold">วิตามินบี 2</span>
                                                        <span className="create-label-percentage">{VITAMIN_B2_PERSERVING}</span>
                                                        <span>%</span>
                                                    </div>
                                                    <div className="create-label-nutrition-box">
                                                        <span className="create-label-nutrition-name create-label-text-bold">แคลเซียม</span>
                                                        <span className="create-label-percentage">{CALCIUM_PERSERVING}</span>
                                                        <span>%</span>
                                                    </div>
                                                </div>
                                                <div className="create-label-layout-flex">
                                                    <div className="create-label-nutrition-box">
                                                        <span className="create-label-nutrition-name create-label-text-bold">เหล็ก</span>
                                                        <span className="create-label-percentage">{IRON_PERSERVING}</span>
                                                        <span>%</span>
                                                    </div>
                                                </div> 
                                            </div>

                                            <hr className="line" />

                                            <div>
                                                * ร้อยละของปริมาณสารอาหารที่แนะนำให้บริโภคต่อวันสำหรับคนไทยอายุตั้งแต่ 6 ปีขึ้นไป (Thai RDI) โดยคิดจากความต้องการพลังงานวันละ 2,000 กิโลแคลอรี่ 
                                            </div>

                                        </div>
                                        <div className="create-button">
                                            <button onClick={create_submit} className="button-submit">บันทึก</button>
                                        </div>
                                    </div>
                                    
                                    
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
