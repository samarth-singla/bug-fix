from fastapi import APIRouter, HTTPException
import random

router = APIRouter(tags=["quiz"])

# Sample quiz questions
questions = [
    {
        "id": 1,
        "text": "What command lists directory contents?",
        "options": ["ls", "cd", "rm", "pwd"],
        "correct": "ls"
    },
    {
        "id": 2,
        "text": "Which command searches for text in files?",
        "options": ["find", "grep", "locate", "cat"],
        "correct": "grep"
    },
    # Add more questions as needed
]

# Game state to track high score
game_state = {"high_score": 0}

@router.get("/question")
async def get_question():
    question = random.choice(questions)
    return {
        "id": question["id"],
        "text": question["text"],
        "options": question["options"]
    }

@router.post("/answer")
async def submit_answer(data: dict):
    question_id = data.get("id")
    answer = data.get("answer")
    current_score = data.get("score", 0)

    # Find the question
    question = next((q for q in questions if q["id"] == question_id), None)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    # Check answer
    is_correct = answer == question["correct"]
    if is_correct:
        current_score += 10
        if current_score > game_state["high_score"]:
            game_state["high_score"] = current_score

    return {
        "is_correct": is_correct,
        "correct_answer": question["correct"],
        "score": current_score,
        "high_score": game_state["high_score"]
    }

@router.get("/highscore")
async def get_highscore():
    return {"high_score": game_state["high_score"]}
