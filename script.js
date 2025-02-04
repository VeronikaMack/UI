let asmuo = {
  lytis: '-',
  vardas: '-',
  antrasis_vardas: '-',
  pavarde: '-',
  gimimo_data: '-',
  asmens_kodas: '-',
  tel_nr: '-',
  el_pastas: '-',
  adresas: '-',

  issilavinimas: '-',
  mokslo_istaiga: '-',
  uzbaigimo_metai: '-',
  kvalifikacija: '-',
  mokslo_laipsnis: '-',

  vedybine_padetis: '-',
  sutuoktinio_vardas: '-',
  sutuoktinio_pavarde: '-',

  profesine_padetis: '-',

  stud_pakopa: '-',
  kursas: '-',
  studiju_istaiga: '-',
  baigimo_m: '-',

  darbo_istaiga: '-',
  pareigos: '-',
  darbo_patirtis: '-',
  darbo_sritis: '-',

  nedarbo_priezastis: '-',
  atostogu_pabaiga: '-'
};



var Form1 = document.getElementById("form1");
var Form2 = document.getElementById("form2");
var Form3 = document.getElementById("form3");
var Form4 = document.getElementById("form4");
var Form5 = document.getElementById("form5");
var Form6 = document.getElementById("form6");
var Form7 = document.getElementById("form7");
var Submit = document.getElementById("submit");
var progress = document.getElementById("progress");

//---------------------------------------------------------DOM----------------------------------------------------------

//ASMENS KODAS

const lytis = document.getElementById('lytis');
const gim_data = document.getElementById('gimimo_data');
const asmens_kodas = document.getElementById('asmens_kodas');

lytis.addEventListener('change', updateAsmensKodas);
gim_data.addEventListener('input', updateAsmensKodas);

function updateAsmensKodas(){
    const lytisValue = lytis.value;
    const gim_dataValue = gim_data.value;

    const year = new Date(gim_dataValue).getFullYear();
    let firstDigit;

      if (lytisValue === 'vyras' && year < 2000) {
        firstDigit = '3';
      } else if (lytisValue === 'moteris' && year < 2000) {
        firstDigit = '4';
      } else if (lytisValue === 'vyras' && year >= 2000) {
        firstDigit = '5';
      } else if (lytisValue === 'moteris' && year >= 2000) {
        firstDigit = '6';
      }
    
    const gim_dataDigits = gim_dataValue.split('-').join('').substring(2);
    const fullAsmensKodas = firstDigit + gim_dataDigits;

    asmens_kodas.value = fullAsmensKodas;
}

//TELEFONO NR.
const phone = document.getElementById("phone");
phone.value = '+370';

//IŠSILAVINIMAS
function toggleQuestions() {
    var educationValue = document.getElementById('issilavinimas').value;
    var educationQuestionsDiv = document.getElementById('issilavinimo_kl');
    if (educationValue === '-') {
      educationQuestionsDiv.classList.add('hidden');
    } else {
      educationQuestionsDiv.classList.remove('hidden');
    }
  }

//MOKSLO LAIPSNIS
function updateDegreeOptions() {

    var educationValue = document.getElementById('issilavinimas').value;
    var degreeDropdown = document.getElementById('mokslo_laipsnis');

    degreeDropdown.innerHTML = '';

    if (educationValue === 'aukstasis_kolegijinis') {
      addOption(degreeDropdown, 'Profesinio bakalauro', 'prof_bak');
    } else if (educationValue === 'aukstasis_universitetinis') {
      addOption(degreeDropdown, 'Bakalauro', 'bak');
      addOption(degreeDropdown, 'Magistro', 'mag');
      addOption(degreeDropdown, 'Mokslų daktaro', 'dakt');
    } else {
      addOption(degreeDropdown, '-', '-');
    }

    var degreeOptionsDiv = document.getElementById('laipsnio_kl');
    degreeOptionsDiv.classList.toggle('hidden2', educationValue === '-');
  }

  function addOption(selectElement, text, value) {
    var option = document.createElement('option');
    option.text = text;
    option.value = value;
    selectElement.add(option);
  }
  
//VEDYBINE PADETIS
function vedybinePadetis() {
  var vedybine_padetis_dropdown = document.getElementById('vedybine_padetis');
  var birthdate_id = document.getElementById('gimimo_data');
  var birthdate = birthdate_id.value;
  var dateObject = new Date(birthdate);
  var age = calculateAge(dateObject);

  if (age < 18) {

    removeOption(vedybine_padetis_dropdown, 'vedęs/ištekėjusi');
    removeOption(vedybine_padetis_dropdown, 'išsiskyręs(-usi)');
  }
  else{
    removeOption(vedybine_padetis_dropdown, 'vedęs/ištekėjusi');
    removeOption(vedybine_padetis_dropdown, 'išsiskyręs(-usi)');
    addOption(vedybine_padetis_dropdown, 'Vedęs/ištekėjusi', 'vedęs/ištekėjusi');
    addOption(vedybine_padetis_dropdown, 'Išsiskyręs(-usi)', 'išsiskyręs(-usi)');
  }

}

function sutuoktinis(){
  var vedybine_padetis_dropdown = document.getElementById('vedybine_padetis').value;
  var sutuoktinisDiv = document.getElementById('sutuoktinis');
  if(vedybine_padetis_dropdown === 'vedęs/ištekėjusi')
  {
    sutuoktinisDiv.classList.remove('hidden');
  }
  else{
    sutuoktinisDiv.classList.add('hidden');
  }
  
}

function addOption(selectElement, text, value) {
  var option = document.createElement('option');
  option.text = text;
  option.value = value;
  selectElement.add(option);
}

function removeOption(selectElement, value) {
  var options = selectElement.options;
  for (var i = 0; i < options.length; i++) {
    if (options[i].value === value) {
      selectElement.remove(i);
      break;
    }
  }
}

function calculateAge(birthdate) {
  var today = new Date();
  var birthdate = new Date(birthdate);
  var age = today.getFullYear() - birthdate.getFullYear();
  if (
    today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}

//PROFESINE PADETIS

function updateprofessionOptions() {

  var professionValue = document.getElementById('profesine_padetis').value;
  var studijuoja = document.getElementById('studijuoja');
  var dirba = document.getElementById('dirba');
  var nedirba = document.getElementById('nedirba');
  var atostogos = document.getElementById('atostogos');
  if (professionValue === 'studijuoja') {
    dirba.classList.add('hidden');
    studijuoja.classList.toggle('hidden');
    nedirba.classList.add('hidden');
    atostogos.classList.add('hidden');
  } else if (professionValue === 'dirba') {
    dirba.classList.toggle('hidden');
    nedirba.classList.add('hidden');
    atostogos.classList.add('hidden');
    studijuoja.classList.add('hidden');
  } else if (professionValue ==='nedirba'){
    nedirba.classList.toggle('hidden');
    atostogos.classList.add('hidden');
    dirba.classList.add('hidden');
    studijuoja.classList.add('hidden');
  }
  else if(professionValue ==='atostogos')
  {
    atostogos.classList.toggle('hidden');
    dirba.classList.add('hidden');
    studijuoja.classList.add('hidden');
    nedirba.classList.add('hidden');
  }
}

//DARBO PATIRTIS
var selectElement = document.getElementById('numberChoice');
for (var i = 0; i <= 100; i++) {
  var option = document.createElement('option');
  option.value = i;
  option.text = i;
  selectElement.add(option);
}

function updateSritisOptions() {
 var numberValue = document.getElementById('numberChoice').value;
 var sritis = document.getElementById('sritis');
 
 if(numberValue === '0')
 {
  sritis.classList.add('hidden');
 }
 else{
  sritis.classList.remove('hidden');
 }
}

//VALIDITY AND NEXT BUTTON
function validateForm(formId) {
  console.log('Validation triggered for form:', formId);
  var form = document.getElementById(formId);
  var requiredInputs = form.querySelectorAll('.input-container input[required]');

  var isValid = true;
  requiredInputs.forEach(function(input) {
    var isVisible = isInputVisible(input);
    if (isVisible && input.value.trim() === '') {
      isValid = false;
    }
  });

  if (!isValid) {
    console.log('Form is not valid. Applying styles.');
    form.classList.add('invalid');
    alert('Please fill in all required fields.');
  } else{
    if(window.matchMedia("(max-width: 400px)").matches&&window.matchMedia("(min-width: 0px)").matches)
    {
      console.log('pirmyn 400px');
      switch(formId){
        case 'form1':
          form.classList.remove('invalid');
          Form1.style.left = "-750px";
          Form2.style.left = "7px";
          progress.style.width = "71.4px"
          break;
        case 'form2':
          form.classList.remove('invalid');
          Form2.style.left = "-750px";
          Form3.style.left = "7px";
          progress.style.width = "107.1px"
          break;
        case 'form3':
          form.classList.remove('invalid');
          Form3.style.left = "-750px";
          Form4.style.left = "7px";
          progress.style.width = "142.8px"
          break;
        case 'form4':
          form.classList.remove('invalid');
          Form4.style.left = "-750px";
          Form5.style.left = "7px";
          progress.style.width = "178.5px"
          break;
        case 'form5':
          form.classList.remove('invalid');
          Form5.style.left = "-750px";
          Form6.style.left = "7px";
          progress.style.width = "214.2px"
          break;
        case 'form6':
          form.classList.remove('invalid');
          Form6.style.left = "-750px";
          Form7.style.left = "7px";
          progress.style.width = "250px"
          break;
      }
    }
    else if(window.matchMedia("(max-width: 600px)").matches&&window.matchMedia("(min-width: 401px)").matches)
    {
      console.log('pirmyn 600px');
      switch(formId){
        case 'form1':
          form.classList.remove('invalid');
          Form1.style.left = "-750px";
          Form2.style.left = "7px";
          progress.style.width = "114.2px"
          break;
        case 'form2':
          form.classList.remove('invalid');
          Form2.style.left = "-750px";
          Form3.style.left = "7px";
          progress.style.width = "171.3px"
          break;
        case 'form3':
          form.classList.remove('invalid');
          Form3.style.left = "-750px";
          Form4.style.left = "7px";
          progress.style.width = "228.4px"
          break;
        case 'form4':
          form.classList.remove('invalid');
          Form4.style.left = "-750px";
          Form5.style.left = "7px";
          progress.style.width = "285.5px"
          break;
        case 'form5':
          form.classList.remove('invalid');
          Form5.style.left = "-750px";
          Form6.style.left = "7px";
          progress.style.width = "342.6px"
          break;
        case 'form6':
          form.classList.remove('invalid');
          Form6.style.left = "-750px";
          Form7.style.left = "7px";
          progress.style.width = "400px"
          break;
      }
    }
    else if(window.matchMedia("(max-width: 900px)").matches&&window.matchMedia("(min-width: 601px)").matches)
    {
      console.log('pirmyn 900px');
      switch(formId){
        case 'form1':
          form.classList.remove('invalid');
          Form1.style.left = "-750px";
          Form2.style.left = "7px";
          progress.style.width = "171.4px"
          break;
        case 'form2':
          form.classList.remove('invalid');
          Form2.style.left = "-750px";
          Form3.style.left = "7px";
          progress.style.width = "257.1px"
          break;
        case 'form3':
          form.classList.remove('invalid');
          Form3.style.left = "-750px";
          Form4.style.left = "7px";
          progress.style.width = "342.8px"
          break;
        case 'form4':
          form.classList.remove('invalid');
          Form4.style.left = "-750px";
          Form5.style.left = "7px";
          progress.style.width = "428.5px"
          break;
        case 'form5':
          form.classList.remove('invalid');
          Form5.style.left = "-750px";
          Form6.style.left = "7px";
          progress.style.width = "514.2px"
          break;
        case 'form6':
          form.classList.remove('invalid');
          Form6.style.left = "-750px";
          Form7.style.left = "7px";
          progress.style.width = "600px"
          break;
      }
    }
    else if(window.matchMedia("(max-width: 2001px)").matches&&window.matchMedia("(min-width: 1500px)").matches)
    {
      console.log('pirmyn 2000px');
      switch(formId){
        case 'form1':
          form.classList.remove('invalid');
          Form1.style.left = "-4000px";
          Form2.style.left = "7px";
          progress.style.width = "371.4px"
          break;
        case 'form2':
          form.classList.remove('invalid');
          Form2.style.left = "-4000px";
          Form3.style.left = "7px";
          progress.style.width = "557.1px"
          break;
        case 'form3':
          form.classList.remove('invalid');
          Form3.style.left = "-4000px";
          Form4.style.left = "7px";
          progress.style.width = "742.8px"
          break;
        case 'form4':
          form.classList.remove('invalid');
          Form4.style.left = "-4000px";
          Form5.style.left = "7px";
          progress.style.width = "928.5px"
          break;
        case 'form5':
          form.classList.remove('invalid');
          Form5.style.left = "-4000px";
          Form6.style.left = "7px";
          progress.style.width = "1114.2px"
          break;
        case 'form6':
          form.classList.remove('invalid');
          Form6.style.left = "-4000px";
          Form7.style.left = "7px";
          progress.style.width = "1300px";
          break;
      }
    }
    else if(window.matchMedia("(min-width: 2002px)").matches)
    {
      console.log('pirmyn 2001px');
      switch(formId){
        case 'form1':
          form.classList.remove('invalid');
          Form1.style.left = "-4000px";
          Form2.style.left = "7px";
          progress.style.width = "571.4px"
          break;
        case 'form2':
          form.classList.remove('invalid');
          Form2.style.left = "-4000px";
          Form3.style.left = "7px";
          progress.style.width = "857.1px"
          break;
        case 'form3':
          form.classList.remove('invalid');
          Form3.style.left = "-4000px";
          Form4.style.left = "7px";
          progress.style.width = "1142.8px"
          break;
        case 'form4':
          form.classList.remove('invalid');
          Form4.style.left = "-4000px";
          Form5.style.left = "7px";
          progress.style.width = "1428.5px"
          break;
        case 'form5':
          form.classList.remove('invalid');
          Form5.style.left = "-4000px";
          Form6.style.left = "7px";
          progress.style.width = "1714.2px"
          break;
        case 'form6':
          form.classList.remove('invalid');
          Form6.style.left = "-4000px";
          Form7.style.left = "7px";
          progress.style.width = "2000px";
          break;
      }
    }
    else{
      console.log("else trigerred pirmyn")
      switch(formId){
        case 'form1':
          form.classList.remove('invalid');
          Form1.style.left = "-750px";
          Form2.style.left = "7px";
          progress.style.width = "200px"
          break;
        case 'form2':
          form.classList.remove('invalid');
          Form2.style.left = "-750px";
          Form3.style.left = "7px";
          progress.style.width = "300px"
          break;
        case 'form3':
          form.classList.remove('invalid');
          Form3.style.left = "-750px";
          Form4.style.left = "7px";
          progress.style.width = "400px"
          break;
        case 'form4':
          form.classList.remove('invalid');
          Form4.style.left = "-750px";
          Form5.style.left = "7px";
          progress.style.width = "500px"
          break;
        case 'form5':
          form.classList.remove('invalid');
          Form5.style.left = "-750px";
          Form6.style.left = "7px";
          progress.style.width = "600px"
          break;
        case 'form6':
          form.classList.remove('invalid');
          Form6.style.left = "-750px";
          Form7.style.left = "7px";
          progress.style.width = "700px"
          break;
      }
    }
  }
}

function isInputVisible(input) {
  return input.offsetHeight !== 0 && input.offsetWidth !== 0;
}
//BACK BUTTON
function backbutton(formID){
  console.log('Back button triggered for form:', formID);

  if(window.matchMedia("(max-width: 400px)").matches&&window.matchMedia("(min-width: 0px)").matches)
    {
      console.log('if 400 triggered for form:', formID);
      switch(formID){
        case 'form2':
          Form1.style.left = "7px";
          Form2.style.left = "750px";
          progress.style.width = "35.7px";
          break;
        case 'form3':
          Form2.style.left = "7px";
          Form3.style.left = "750px";
          progress.style.width = "71.4px";
          break;
        case 'form4':
          Form3.style.left = "7px";
          Form4.style.left = "750px";
         progress.style.width = "107.1px";
          break;
        case 'form5':
          Form4.style.left = "7px";
         Form5.style.left = "750px";
         progress.style.width = "142.8px";
          break;
        case 'form6':
          Form5.style.left = "7px";
          Form6.style.left = "750px";
          progress.style.width = "178.5px";
          break;
        
      }
    }
    else if(window.matchMedia("(max-width: 600px)").matches&&window.matchMedia("(min-width: 401px)").matches)
    {
      console.log('if 600 triggered for form:', formID);
      switch(formID){
        case 'form2':
          Form1.style.left = "7px";
          Form2.style.left = "750px";
          progress.style.width = "57.1px";
          break;
        case 'form3':
          Form2.style.left = "7px";
          Form3.style.left = "750px";
          progress.style.width = "114.2px";
          break;
        case 'form4':
          Form3.style.left = "7px";
          Form4.style.left = "750px";
         progress.style.width = "171.3px";
          break;
        case 'form5':
          Form4.style.left = "7px";
          Form5.style.left = "750px";
          progress.style.width = "228.4px";
          break;
        case 'form6':
          Form5.style.left = "7px";
          Form6.style.left = "750px";
          progress.style.width = "285.5px";
          break;
      }
    }
    else if(window.matchMedia("(max-width: 900px)").matches&&window.matchMedia("(min-width: 601px)").matches)
    {
      console.log('if 900 triggered for form:', formID);
      switch(formID){
        case 'form2':
          Form1.style.left = "7px";
          Form2.style.left = "750px";
          progress.style.width = "85.7px";
          break;
        case 'form3':
          Form2.style.left = "7px";
          Form3.style.left = "750px";
          progress.style.width = "171.4px";
          break;
        case 'form4':
          Form3.style.left = "7px";
          Form4.style.left = "750px";
         progress.style.width = "257.1px";
          break;
        case 'form5':
          Form4.style.left = "7px";
          Form5.style.left = "750px";
          progress.style.width = "342.8px";
          break;
        case 'form6':
          Form5.style.left = "7px";
          Form6.style.left = "750px";
          progress.style.width = "428.5px";
          break;
      }
    }
    else if(window.matchMedia("(max-width: 2001px)").matches&&window.matchMedia("(min-width: 1500px)").matches)
    {
      console.log('if 2000 triggered for form:', formID);
      switch(formID){
        case 'form2':
          Form1.style.left = "7px";
          Form2.style.left = "4000px";
          progress.style.width = "185.7px";
          break;
        case 'form3':
          Form2.style.left = "7px";
          Form3.style.left = "4000px";
          progress.style.width = "371.4px";
          break;
        case 'form4':
          Form3.style.left = "7px";
          Form4.style.left = "4000px";
         progress.style.width = "557.1px";
          break;
        case 'form5':
          Form4.style.left = "7px";
          Form5.style.left = "4000px";
          progress.style.width = "742.8px";
          break;
        case 'form6':
          Form5.style.left = "7px";
          Form6.style.left = "4000px";
          progress.style.width = "928.5px";
          break;
      }
    }
    else if(window.matchMedia("(min-width: 2002px)").matches)
    {
      console.log('if 2001 triggered for form:', formID);
      switch(formID){
        case 'form2':
          Form1.style.left = "7px";
          Form2.style.left = "4000px";
          progress.style.width = "285.7px";
          break;
        case 'form3':
          Form2.style.left = "7px";
          Form3.style.left = "4000px";
          progress.style.width = "571.4px";
          break;
        case 'form4':
          Form3.style.left = "7px";
          Form4.style.left = "4000px";
         progress.style.width = "857.1px";
          break;
        case 'form5':
          Form4.style.left = "7px";
          Form5.style.left = "4000px";
          progress.style.width = "1142.8px";
          break;
        case 'form6':
          Form5.style.left = "7px";
          Form6.style.left = "4000px";
          progress.style.width = "1428.5px";
          break;
      }
    }
    else{
      console.log('else triggered for form:', formID);
      switch(formID){
        case 'form2':
          Form1.style.left = "7px";
          Form2.style.left = "750px";
          progress.style.width = "100px";
          break;
        case 'form3':
          Form2.style.left = "7px";
          Form3.style.left = "750px";
          progress.style.width = "200px";
          break;
        case 'form4':
          Form3.style.left = "7px";
          Form4.style.left = "750px";
         progress.style.width = "300px";
          break;
        case 'form5':
          Form4.style.left = "7px";
          Form5.style.left = "750px";
          progress.style.width = "400px";
          break;
        case 'form6':
          Form5.style.left = "7px";
          Form6.style.left = "750px";
          progress.style.width = "500px";
          break;
      }
    }
}

//INFORMACIJOS SAUGOJIMAS I OBJEKTA
function saugojimas(){
  console.log("saugojimo funckija start");
  asmuo.lytis = document.getElementById('lytis').value;
  asmuo.vardas = document.getElementById('vardas').value;
  asmuo.antrasis_vardas = document.getElementById('antrasis_vardas').value;
  asmuo.pavarde = document.getElementById('Pavarde').value;
  asmuo.gimimo_data = document.getElementById('gimimo_data').value;
  asmuo.asmens_kodas = document.getElementById('asmens_kodas').value;
  asmuo.tel_nr = document.getElementById('phone').value;
  asmuo.el_pastas = document.getElementById('pastas').value;
  asmuo.issilavinimas = document.getElementById('issilavinimas').value;
  asmuo.mokslo_istaiga = document.getElementById('mokslo_istaiga').value;
  asmuo.uzbaigimo_metai= document.getElementById('uzbaigimo_metai').value;
  asmuo.kvalifikacija = document.getElementById('kvalifikacija').value;
  asmuo.mokslo_laipsnis = document.getElementById('mokslo_laipsnis').value
  asmuo.adresas = document.getElementById('adresas').value;
  asmuo.vedybine_padetis = document.getElementById('vedybine_padetis').value;
  asmuo.sutuoktinio_vardas = document.getElementById('sutuoktinis_vardas').value;
  asmuo.sutuoktinio_pavarde = document.getElementById('sutuoktinis_pavarde').value;
  asmuo.profesine_padetis = document.getElementById('profesine_padetis').value;
  asmuo.stud_pakopa = document.getElementById('studiju_pakopa').value;
  asmuo.kursas = document.getElementById('kursas').value;
  asmuo.studiju_istaiga = document.getElementById('studiju_istaiga').value;
  asmuo.baigimo_m = document.getElementById('tiketini_baigimo_metai').value;
  asmuo.darbo_istaiga = document.getElementById('darbo_istaiga').value;
  asmuo.pareigos = document.getElementById('pareigos').value;
  asmuo.nedarbo_priezastis = document.getElementById('nedarbo_priezastis').value;
  asmuo.atostogu_pabaiga = document.getElementById('atostogu_pabaiga').value;
  asmuo.darbo_patirtis=document.getElementById('numberChoice').value;
  asmuo.darbo_sritis = document.getElementById('darbo_sritis').value;
  console.log(asmuo);
}