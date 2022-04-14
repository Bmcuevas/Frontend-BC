// COMPONENTS
Vue.component("my-card", {
    // podría separar tarjeta y botones en dos componentes distintos... 
        props:[
            "pregunta",
            "questionkindobject", 
            "selectedkind"], 
        template: `
        <div>
            <div class="card text-white bg-dark mb-3">
            <p class="card-header" id="question-number" v-if = "this.position > 0">
            <span class = "my-span2">{{pregunta[position].kind}}</span>
            </p>
            <div class="card-body">

            <h2 class="question" id="question-box" v-if = "this.position == 0">
            Hace click en  <span class = "my-span"> <i class="fa fa-solid fa-forward"></i> </span>  para ver una pregunta...
          </h2>

            <h2 class="question" id="question-box" v-if = "this.position >0">
            {{pregunta[position].question}}
            </h2>
            </div>
        </div>

        <div class="buttons">
            <div class="btn-group btn-group-lg" role="group" aria-label="Basic mixed styles example">
            <button class="btn btn-info"><a href="https://docs.google.com/spreadsheets/d/15RPB8klEso0s9nEVlUE1Rrh7_BTcBi3H3WY-DmisQLk/edit#gid=0" target ="_blank"><i class="fa fa-solid fa-pen"></i></a></button>
            <button id="question-btn-back" class="btn btn-warning" v-on:click="moveBack()"><i class="fa fa-solid fa-backward"></i></button>
            <button id="question-btn" class="btn btn-warning" v-on:click="moveFoward()"><i class="fa fa-solid fa-forward"></i></button>
            <button type="button" class="btn btn-danger"><i class="fa fa-solid fa-thumbs-down"></i></button>
            <button type="button" class="btn btn-success"><i class="fa fa-solid fa-thumbs-up"></i></button>
            </div>
        </div>
      </div>`, 
        
        data(){ return{
            num:  0,
            position: 0, 
            cont: 0,
            newQuestion: "",
        }
        },
        methods:{ 
            // Evento botones "adelante" y "atrás"
            // Me conviene tener estos métodos acá? 
            moveBack(){ 
                if (this.position > 0){
                this.position = this.position - 1; 
                }

            },
            moveFoward(){
                if (this.position != this.num){
                    this.position = this.position + 1; 
                } else{ 
                    this.num = this.num + 1;
                    this.position = this.num;
                    let [prop, questionKind] = returnKind(this.selectedkind)
                    let newQuestion = returnQuestion(prop,this.questionkindobject);
                    // let newQuestion = returnQuestion(newQuestionNumber); 
                    let object = {question: newQuestion, "answer": "", kind: questionKind, color:""}
                    this.pregunta.push(object)
                }
            }
        }
    }
)

// FUNCTIONS! 
// CREATING RANDOM NUMBER
function returnKind(kindArr){
    let kind = ""
    let prop = ""
    let number = parseInt(Math.random()*kindArr.length);
    prop = kindArr[number];
    switch (prop) {
        case "picante":
            kind = "Picante"
            break;
        case "previa":
            kind = "Previa"
            break;
        case "gente":
            kind = "Pregunta Inofensiva"
            color = "#8ADDFF";
            break;
        case "ing":
            kind = "Ingeniero"
            break;
        case "general":
            kind = "Cultura General";
            break;
        case "conocer":
            kind = "¿Cuánto te conocen?";
            break;
        default:
            kind = "";
            prop = "gente";
            break;
    }
    return [prop, kind]; 
}

function returnQuestion(prop, kindObj) {
    // Selecting random Kind
    let questionKindArray = kindObj[prop]; 
    if (!questionKindArray){return `Elegí un modo de juego!`} //obligo a que el usuario elija un modo de juego
    
    // Selecting random question
    let number = parseInt(Math.random()*questionKindArray.length);
    let newQuestion = questionKindArray[number]
    return newQuestion
}

// APP: questions
const app = new Vue({
    el: "#app",
    data:{ 
        questions:[{}], 
        questionKind:["gente"], 
        gente: ["¿cuantos hermanos tenes?"],

        // Defino los arreglos con las preguntas
        questionObject:{
            previa: ["¿Verano o invierno?", "¿Que te encaren o encarar?", "¿Pico o Chape?", "¿Montaña o playa?", "¿Gusto de helado favorito?", "¿Te gusta la menta granizada?", "¿Cerveza o fernet?", "¿Cómo fue tu peor vez...?", "¿Hombre, mujeres, ambos o perros?", "¿Es más pesada una piedra de un kg que un almohadon con un kg de plumas?", "¿Te chaparias a la persona que tenes al lado?", "¿Cuál es el mejor trago?", "¿Arriba o abajo?", "¿A quién le darías un beso de los que están acá?", "¿Con quién de acá harias una película xxx?"],

            gente: ["¿Que es lo que te gusta hacer para relajar?","¿Alguna cosa chiquita que te alegre el dia?","¿A que le tenes miedo?", "Si hoy te ofrecieran irte de viaje ¿ A dónde te irías?","¿Qué es lo que más te gusta de vos?",
            "Suponiendo que la reencarnación existe, ¿en que o en quién te gustaría reencarnar?","¿Cuándo te parece que sabes que estás enamorado de alguien?",
            "¿Perdonaste o perdonarías una infidelidad?","¿Hay algo que harías diferente o que cambiarías de tu pasado?",
            "¿Que es lo que más te gusta de tu cuerpo?","¿Cuál es tu ídolo?","¿Algo que cambiarias del mundo?","¿Sos feliz?","¿Cuál es tu cábala?¿Para qué?",
            "¿En que momentos o situaciones sentís que sos amado?","¿Que tomas cuando salis?","¿Cuál es tu día favorito del año?",
            "¿Qué es lo que te enamora de una persona?","¿Qué estás pensando en comprarte?","¿Elegirías ser inmortal?¿Por qué?",
            "¿Cómo te imaginás en el futuro?","¿Messi o Maradona?","¿Cómo superaste a tu primer amor?","¿Sabes por qué te pusieron ese nombre?",
            "¿4 cosas que ames","¿Cuál consideras que fue el mejor momento de tu vida?","¿Cuál es tu lugar favorito?",
            "¿Alguien que ames?","¿Cuestionas lo que lees en un libro?¿Por qué?","¿Te tatuarías? ¿Qué?","¿Cuál es tu numero de la suerte?",
            "¿Pelo largo o pelo corto?","¿Amor o dinero?","¿Qué idioma te gustaría hablar?","¿Te gusta tu nombre?","¿Sabes qué significa tu nombre?",
            "¿Tocás algun instrumento? ¿Cuál? Si no, ¿cual te gustaría tocar?","¿Cuál fue tu mejor golpe de suerte?","¿Te caen bien tus vecinos?",
            "¿Animal favorito?","¿Te irías de viaje a los mejores lugares con alguien a quién no soportes?","¿Cambiarías tu vida por la de otra persona?",
            "¿Qué es lo mejor que te haya enseñado una persona?","¿Qué define que algo esté bien o mal?","¿Qué es lo que no te puede faltar en la heladera?",
            "¿Cuándo fue la última vez que fuiste gentil con el corazón de un extraño?","¿Estás listo para un verano de amor?","¿Cuál es tu pregunta favorita?",
            "¿Que harías si no tuvieras miedo?","¿Sonido favorito?","¿Cuándo te sentís insegura?","¿Cómo definirías la belleza? ¿Crees que sos lindo/a?",
            "¿Qué cosa de tu vida actual, tu versión adolescente no podría creer?","¿Rubios o morochos?","¿Qué es un amigo para vos?",
            "¿3 palabras que te gusten?","¿Qué harías mañana si se acabaría el mundo pasado mañana?","¿Te consideras una persona amada?",
            "¿Alguna vez intentaste cambiar a una persona?¿y pudiste?","¿Te gusta la afrenalina? (Tirarte de un paracaídas, bungee jumping, etc)",
            "¿Te hago acordar a alguien?¿A quién?","¿Que es el amor propio para vos?","¿Qué es la felicidad para vos?",
            "¿Que superpoder elegirías tener?","¿Canción favorita?",
            "¿A quién elegirías para acompañarte en todas las aventuras que se te presenten por el resto de tu vida?","¿Un tema del que te guste hablar?",
            "1/4 de helado ¿Qué gustos elegís?","¿Crees en la amistad entre el hombre y la mujer?",
            "¿Pensáis que hay algo después de la muerte? ¿Como lo describirías?","¿Algo que harías si fuese el último día de tu vida?",
            "Si tenes plata extra, ¿en qué la gastas?","¿Crees en algún Dios?¿cómo lo definirías?","¿Película favorita?",
            "¿Cómo se llama tu papá? ¿me decís una cosa acerca de él?","¿Te gusta tu nombre?","¿Te gusta tu cumpleaños?",
            "¿Extrañas a alguien en tu vida hoy? Si quisieras ¿podrías invitarlo/la a juntarse?","¿Te enamoraste alguna vez?",
            "Hoy ¿estás enamorado de alguien o te gusta alguien?","¿Algún dato curioso?","¿Sentís que la sociedad te presiona en algunas cuestiones?",
            "Si pudieras cambiar una sola cosa de tu cuerpo, ¿qué cambiarías?","¿Verano o invierno?","¿Fuiste infiel alguna vez?",
            "Si te gusta alguien¿Le hablas vos o que la otra persona te hable?","¿Libros o series?","¿Te da miedo llegar a alguna determinada edad? ¿Cuál?",
            "¿Tenes algún vicio? ¿Cuál?","¿Helado o pizza?","Si pudieras elegir en este momento, ¿con quién estarías, en dónde y qué haciendo?",
            "¿Tenés algún sueño que quieras hacer?","¿Qué es lo que más necesitas en este momento?","¿Como viene tu día hasta ahora? Enserio",
            "¿Cuál fue tu peor pesadilla?","¿Algo tuyo que te cueste admitir?","¿Qué es el amor para vos?","¿En que pensas antes de dormir?","¿Pasta o pollo?",
            "¿Volverías a repetir tu último beso?","¿Preferís navidad o año nuevo?","¿Destino o casualidad?",
            "¿Que te siga y no te de like o que no te siga pero te ponga like?","¿El tiempo te asusta?","¿A quién llamas cuando estás mal?",
            "¿Alguna cosa que no soportes?","Si te encontras un millon de dólares en el piso,¿A quién se lo contás primero?",
            "¿Podrías tener una relación abierta?","¿Cuál es TU dato curioso?","¿Sentís que encontraste la vocación de tu vida?",
            "Pensa en alguien a quien admires, ¿por qué elegiste a esa persona?","¿Algo de lo que estes más agradecido en este momento?",
            "¿Morir pobre o morir virgen?","¿Qué es lo más lindo que te pueden decir?","¿Cómo es el teorema de pitágoras?",
            "¿Alguna vez te perdiste de intentar algo con alguien por miedo?","¿Algo que te salga muy mal o no sepas hacer?",
            "¿Cual es LA cosa tuya que nunca cambiarías de vos?","¿Algún sueño tuyo que hayas abandonado?","¿Te arrepentís de algo?",
            "¿Conconsideras que sabes amar?","¿Cuál es tu mejor plan?","¿Tu color favorito?","¿Cuál fue el mejor chamullo que te hicieron?",
            "Si pudieras vivir por un día en la vida de otra persona, ¿en la de quién?","¿Con que personaje de Disney te sentís identificado?",
            "¿Cuál fue o cuál es la mejor forma de usar tu tiempo?","¿Cuál sería la mejor propuesta de casamiento?","¿El mejor lugar para una primera cita?",
            "¿Qué NO comerías en una primera cita?","¿Cómo te describís en 3 palabras?","¿Cuál sería un motivo para descorchar el champagne?",
            "¿Amar o ser amado?","¿Elegirías saber como o cuando te vas a morir?","Tipo de flor preferida?","¿Qué harías si no tuvieras miedo?",
            "¿Qué queres hacer HOY, que estas dejando para mañana?","¿Alguna vez algún extraño te cambio la vida? ¿Cuándo?",
            "¿Qué estarías necesitando que pase más seguido en tu vida?","¿Qué te hubiese gustado hacer menos?","¿Algo que te haya hecho feliz últimamente?",
            "Si tendrías que definir a la felicidad con una accion ¿qué acción sería?","¿Qué es la libertad para vos?",
            "¿Te convertiste en la persona que querías ser?","¿Alguien que te haya hecho sentir bien últimamente?","¿Qué opinas de la persona de tu derecha?",
            "¿Estás enamorado/a?","¿Que valor aportás a tu entorno?","¿Cómo descargás tus emociones?","Decí una frase o cita que te guste.",
            "¿Hay algo que sea importante para todos y no para vos?", "¿Ser el mejor en algo o ser bueno en todo?"],

            ing: ["¿Cuáles son los primeros 5 números de π?", "¿Qué es el teorema central del límite?", "¿Qué es una distribución Bernoulli?", "Una binomial es una suma de...","¿Que es una corriente parásita?", "¿Que es la reluctancia?","¿Qué es el factor de potencia?", "¿Cuál es la derivada de xˆ2?", "¿Cuál es la integral de xˆ2?", "¿Que es S en Laplace?", "¿Cómo demostras algo por inducción?", "¿Que es un volumen de control?", "¿Que es una ecuación diferencial?", "¿Cuando la derivada de una función se hace cero que esta pasando?", "Enuncia la ley de Ohm", "Enuncia el teorema de Bolzano","¿Qué es un MRP?","¿Qué es la entropia?","¿Qué es la entalpía?","¿El voltaje es proporcional o inversamente proporcional a la corriente?"], 

            general: ["¿Cuál es la distancia de la tierra a la luna?", "¿Cuál es el promedio de pelos en un hombre?", "¿En qué año fue la primera guerra mundial?", "¿En qué año fue la segunda Guerra Mundial?", "¿Cuántas personas hay en la tierra?", "¿Cuántas estrellas hay en el universo?", "¿Quién es el hombre más rico del mundo?", "¿Quién es Peter Parker?", "¿Quién dijo la frase ‘Un gran poder conlleva una gran responsabilidad’?", "¿Cuánto tiempo viven los perros?", "¿Cuánto tiempo viven los gatos?"],

            picante: ["¿Pasar hambre o sed?", "¿Perdonaste una infidelidad?", "¿Comer hamburguesa por un año o nunca más comer algo que te guste?", "¿Ser millonario o morir virgen?", "¿Vivir 200 años sin amor o vivir 30 con amor?", "¿Adelante o atras?", "¿Probaste en el auto?", "¿Te sentas en la torta?", "¿Te chaparias a la persona que tenes al lado?", "¿Tragas o escupís?", "¿Estar con tu padre en el cuerpo de tu pareja o con tu pareja en el cuerpo de tu padre?", "¿Cómo preferis morirte?", "¿Arriba o abajo?", "¿Que tipo de nopor miras?", "¿Cambiaron tus gustos de nopor en el tiempo?", "¿Buscarías ayuda terapéutica para solucionar algún problema sexual?", "¿Usas algo para hacer más intensa la experiencia en la cama...? ¿Qué?", "¿Cuando y cómo fue tu primera vez?", "¿Alguna vez pagaste por sexo?", "¿Alguna vez te pagaron por sexo?", "¿Previa antes del acto sexual o no?", "¿Cuál es la previa perfecta antes de...?", "¿Dominar o ser dominado?", "¿Cada cuánto y cómo le das al ganzo?", "¿En que pensas cuando te tocas?", "¿Cuál fue tu experiencia más incómoda en la cama?", "¿Sexo rápido o prolongado?", "¿Te gusta dar o que te den por el chiquito?", "¿Alguna vez estuviste con alguien que no debías?", "¿Algo que quieras probar en la cama?", "¿Salvaje o romántico?", "¿Decís que no cuando no te gusta?", "¿Te gusta sextear?"], 

            conocer: ['¿Cuál es tu color favorito?', '¿Cuál es tu gusto de helado favorito?', '¿Pizza o Hamburguesa?', '¿Cuantas parejas tuviste?', '¿Cuál es tu comida favorita?', '¿Fernet o cerveza?', '¿Qué tipo de música escuchas?']
        }, 

        // Defino los arreglos según los checkbox. 
        auxQuestionObject:{
            previa: "",
            gente: ["¿Que es lo que te gusta hacer para relajar?","¿Alguna cosa chiquita que te alegre el dia?","¿A que le tenes miedo?", "Si hoy te ofrecieran irte de viaje ¿ A dónde te irías?","¿Qué es lo que más te gusta de vos?",
            "Suponiendo que la reencarnación existe, ¿en que o en quién te gustaría reencarnar?","¿Cuándo te parece que sabes que estás enamorado de alguien?",
            "¿Perdonaste o perdonarías una infidelidad?","¿Hay algo que harías diferente o que cambiarías de tu pasado?",
            "¿Que es lo que más te gusta de tu cuerpo?","¿Cuál es tu ídolo?","¿Algo que cambiarias del mundo?","¿Sos feliz?","¿Cuál es tu cábala?¿Para qué?",
            "¿En que momentos o situaciones sentís que sos amado?","¿Que tomas cuando salis?","¿Cuál es tu día favorito del año?",
            "¿Qué es lo que te enamora de una persona?","¿Qué estás pensando en comprarte?","¿Elegirías ser inmortal?¿Por qué?",
            "¿Cómo te imaginás en el futuro?","¿Messi o Maradona?","¿Cómo superaste a tu primer amor?","¿Sabes por qué te pusieron ese nombre?",
            "¿4 cosas que ames","¿Cuál consideras que fue el mejor momento de tu vida?","¿Cuál es tu lugar favorito?",
            "¿Alguien que ames?","¿Cuestionas lo que lees en un libro?¿Por qué?","¿Te tatuarías? ¿Qué?","¿Cuál es tu numero de la suerte?",
            "¿Pelo largo o pelo corto?","¿Amor o dinero?","¿Qué idioma te gustaría hablar?","¿Te gusta tu nombre?","¿Sabes qué significa tu nombre?",
            "¿Tocás algun instrumento? ¿Cuál? Si no, ¿cual te gustaría tocar?","¿Cuál fue tu mejor golpe de suerte?","¿Te caen bien tus vecinos?",
            "¿Animal favorito?","¿Te irías de viaje a los mejores lugares con alguien a quién no soportes?","¿Cambiarías tu vida por la de otra persona?",
            "¿Qué es lo mejor que te haya enseñado una persona?","¿Qué define que algo esté bien o mal?","¿Qué es lo que no te puede faltar en la heladera?",
            "¿Cuándo fue la última vez que fuiste gentil con el corazón de un extraño?","¿Estás listo para un verano de amor?","¿Cuál es tu pregunta favorita?",
            "¿Que harías si no tuvieras miedo?","¿Sonido favorito?","¿Cuándo te sentís insegura?","¿Cómo definirías la belleza? ¿Crees que sos lindo/a?",
            "¿Qué cosa de tu vida actual, tu versión adolescente no podría creer?","¿Rubios o morochos?","¿Qué es un amigo para vos?",
            "¿3 palabras que te gusten?","¿Qué harías mañana si se acabaría el mundo pasado mañana?","¿Te consideras una persona amada?",
            "¿Alguna vez intentaste cambiar a una persona?¿y pudiste?","¿Te gusta la afrenalina? (Tirarte de un paracaídas, bungee jumping, etc)",
            "¿Te hago acordar a alguien?¿A quién?","¿Que es el amor propio para vos?","¿Qué es la felicidad para vos?",
            "¿Que superpoder elegirías tener?","¿Canción favorita?",
            "¿A quién elegirías para acompañarte en todas las aventuras que se te presenten por el resto de tu vida?","¿Un tema del que te guste hablar?",
            "1/4 de helado ¿Qué gustos elegís?","¿Crees en la amistad entre el hombre y la mujer?",
            "¿Pensáis que hay algo después de la muerte? ¿Como lo describirías?","¿Algo que harías si fuese el último día de tu vida?",
            "Si tenes plata extra, ¿en qué la gastas?","¿Crees en algún Dios?¿cómo lo definirías?","¿Película favorita?",
            "¿Cómo se llama tu papá? ¿me decís una cosa acerca de él?","¿Te gusta tu nombre?","¿Te gusta tu cumpleaños?",
            "¿Extrañas a alguien en tu vida hoy? Si quisieras ¿podrías invitarlo/la a juntarse?","¿Te enamoraste alguna vez?",
            "Hoy ¿estás enamorado de alguien o te gusta alguien?","¿Algún dato curioso?","¿Sentís que la sociedad te presiona en algunas cuestiones?",
            "Si pudieras cambiar una sola cosa de tu cuerpo, ¿qué cambiarías?","¿Verano o invierno?","¿Fuiste infiel alguna vez?",
            "Si te gusta alguien¿Le hablas vos o que la otra persona te hable?","¿Libros o series?","¿Te da miedo llegar a alguna determinada edad? ¿Cuál?",
            "¿Tenes algún vicio? ¿Cuál?","¿Helado o pizza?","Si pudieras elegir en este momento, ¿con quién estarías, en dónde y qué haciendo?",
            "¿Tenés algún sueño que quieras hacer?","¿Qué es lo que más necesitas en este momento?","¿Como viene tu día hasta ahora? Enserio",
            "¿Cuál fue tu peor pesadilla?","¿Algo tuyo que te cueste admitir?","¿Qué es el amor para vos?","¿En que pensas antes de dormir?","¿Pasta o pollo?",
            "¿Volverías a repetir tu último beso?","¿Preferís navidad o año nuevo?","¿Destino o casualidad?",
            "¿Que te siga y no te de like o que no te siga pero te ponga like?","¿El tiempo te asusta?","¿A quién llamas cuando estás mal?",
            "¿Alguna cosa que no soportes?","Si te encontras un millon de dólares en el piso,¿A quién se lo contás primero?",
            "¿Podrías tener una relación abierta?","¿Cuál es TU dato curioso?","¿Sentís que encontraste la vocación de tu vida?",
            "Pensa en alguien a quien admires, ¿por qué elegiste a esa persona?","¿Algo de lo que estes más agradecido en este momento?",
            "¿Morir pobre o morir virgen?","¿Qué es lo más lindo que te pueden decir?","¿Cómo es el teorema de pitágoras?",
            "¿Alguna vez te perdiste de intentar algo con alguien por miedo?","¿Algo que te salga muy mal o no sepas hacer?",
            "¿Cual es LA cosa tuya que nunca cambiarías de vos?","¿Algún sueño tuyo que hayas abandonado?","¿Te arrepentís de algo?",
            "¿Conconsideras que sabes amar?","¿Cuál es tu mejor plan?","¿Tu color favorito?","¿Cuál fue el mejor chamullo que te hicieron?",
            "Si pudieras vivir por un día en la vida de otra persona, ¿en la de quién?","¿Con que personaje de Disney te sentís identificado?",
            "¿Cuál fue o cuál es la mejor forma de usar tu tiempo?","¿Cuál sería la mejor propuesta de casamiento?","¿El mejor lugar para una primera cita?",
            "¿Qué NO comerías en una primera cita?","¿Cómo te describís en 3 palabras?","¿Cuál sería un motivo para descorchar el champagne?",
            "¿Amar o ser amado?","¿Elegirías saber como o cuando te vas a morir?","Tipo de flor preferida?","¿Qué harías si no tuvieras miedo?",
            "¿Qué queres hacer HOY, que estas dejando para mañana?","¿Alguna vez algún extraño te cambio la vida? ¿Cuándo?",
            "¿Qué estarías necesitando que pase más seguido en tu vida?","¿Qué te hubiese gustado hacer menos?","¿Algo que te haya hecho feliz últimamente?",
            "Si tendrías que definir a la felicidad con una accion ¿qué acción sería?","¿Qué es la libertad para vos?",
            "¿Te convertiste en la persona que querías ser?","¿Alguien que te haya hecho sentir bien últimamente?","¿Qué opinas de la persona de tu derecha?",
            "¿Estás enamorado/a?","¿Que valor aportás a tu entorno?","¿Cómo descargás tus emociones?","Decí una frase o cita que te guste.",
            "¿Hay algo que sea importante para todos y no para vos?"], 
            ing: "",
            general: "",
            picante: "",
            conocer: "",
        }
    }, 
    methods:{
        // Esta función es para tomar las preguntas del checkbox 
        creatingArray(){
            // Borro props del arreglo
            delete this.auxQuestionObject.picante
            delete this.auxQuestionObject.previa
            delete this.auxQuestionObject.gente 
            delete this.auxQuestionObject.ing
            delete this.auxQuestionObject.general
            delete this.auxQuestionObject.conocer
            
            let kindArray = Object.values(this.questionKind)
            for (var i = 0; i < kindArray.length; i++){
                var supp = kindArray[i]; 
                switch (supp) {
                    case "picante":
                        this.auxQuestionObject.picante = this.questionObject.picante; 
                        break;
                    case "previa":
                        this.auxQuestionObject.previa = this.questionObject.previa;
                        break;
                    case "gente":
                        this.auxQuestionObject.gente = this.questionObject.gente; 
                        break;
                    case "ing":
                        this.auxQuestionObject.ing = this.questionObject.ing; 
                        break;
                    case "general":
                        this.auxQuestionObject.general = this.questionObject.general;
                        break;
                    case "conocer":
                        this.auxQuestionObject.conocer = this.questionObject.conocer;
                        break;
                    default:
                        this.auxQuestionObject.gente = this.questionObject.gente; 
                        break;
                }
            }
    }
}
})


// QUESTIONS ARRAY
// Este array lo tengo que sacar cuando me funcione el objecto con los array de preguntas. 