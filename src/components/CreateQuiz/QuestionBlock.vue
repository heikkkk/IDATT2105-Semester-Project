<script setup>
import '../../assets/css/CreateQuiz/questionBlock.css'
import { useQuizStore } from '@/stores/QuizStore.js'
import { useQuestionStore} from '@/stores/QuestionStore.js'

// Defining emits and props for communication with the parent component
const emit = defineEmits(['toggleQuestionEvent']);
const props = defineProps({
  id:{
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: 'src/assets/img/questionMark.png'
  }
})

/**
 * Removes the question associated with this question block's id.
 */
function onDeleteButtonPressed() {
  const quizStore = useQuizStore();
  quizStore.getActiveQuiz.questions = quizStore.getActiveQuiz.questions.filter(question => question.questionId !== props.id);
}

/**
 * Sets the active question ID in the question store and emits an event to toggle the question in the parent component.
 */
const onQuestionBlockPressed = () => {
  useQuestionStore().setActiveQuestionId(props.id)
  emit('toggleQuestionEvent', props.id);
}
</script>

<template>
  <div class="question-block-wrapper" @click="onQuestionBlockPressed">

    <div class="question-block-button-container">
      <p>{{ index + 1 }}</p>
      <button class="question-delete-button" @click="onDeleteButtonPressed()"><i class="fas fa-trash"></i></button>
    </div>

    <div class="question-block-container">
      <div class="question-block-title-container">
        <p>{{props.title}}</p>
      </div>
      <div class="question-block-image-container">
        <img :src="props.image" alt="">
      </div>
    </div>

  </div>
</template>