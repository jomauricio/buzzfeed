import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {


  playChoose(value:string) {
    this.answers.push(value)
    this.nextStep()
  }

  nextStep(){
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAswer: string = this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAswer as keyof typeof quizz_questions.results]
    }
  }

  checkResult(anwsers:string[]){
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length >
          arr.filter(item => item === previous).length) {
            return previous
      } else {
        return current
      }
    })
    return result
  }

  title:string = ""
  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished:boolean = false

  ngOnInit(): void{
    if (quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }
}
