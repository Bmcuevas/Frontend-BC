Vue.component("my-card", {
        props: ["pregunta"],
        template: `<div class = "question">
        <p>Número {{pregunta[num].number}} - {{pregunta[num].question}}</p> 
        <p>{{pregunta[0].question}}</p>
        <p>{{pregunta[0].answer}}</p>
        
        <button v-on:click="returnQuestion()">agregar</button></div>`, 
        data(){ return{
            num:  0,
            cont: 0,
            newQuestion: "",
        }

        },
        methods:{ 
            returnQuestion(){
                this.num = this.num + 1;
                let newQuestionNumber = returnNumber();
                let newQuestion = returnQuestion(newQuestionNumber); 
                let object = {number: newQuestionNumber, question: newQuestion, "answer": "", "kind":"", "color":""}
                this.pregunta.push(object)
            } 
        }
    }
)

// FUNCTIONS! 

// CREATING RANDOM NUMBER
const array = ["hola","como","estas",4,5,6,7,8,9,10]; 

function returnNumber() {
    let number = parseInt(Math.random()*array.length);
    return number  
}

function returnQuestion(num){
    newQuestion = array[num];
    return newQuestion
}


const app = new Vue({
    el: "#app",
    data:{ 
        questions:[
            {
            number: 10, 
            question: "¿Cuál es tu color favorito?", 
            answer: "Verde",
            kind: "Pregunta Normal",
            color: "#FA6D25", 
        },
        // {
        //     number: 2, 
        //     question: "¿Te gusto mucho?", 
        //     kind: "Pregunta de ingeniería",
        //     color: "#4FCD8C", 
        // }
    ]
    }
})

