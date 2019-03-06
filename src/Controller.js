import React, { Component } from "react";
import Viz from "./Viz.js";

export default class Controller extends Component {
  state = {
    scores: {
      law: 0,
      good: 0
    },

    answered: 0
  };

  questions = [
    {
      question:
        "You find a bag of gold left unattended in a busy market. What do you do?",
      category: "law",
      answers: [
        "Alert the guards, and give it to them so they can find the rightful owner!",
        "Guard it yourself until someone arrives",
        "Leave it there and go about my day, it's not mine, and not my problem.",
        "I'll pick it up, but if someone goes looking for it I'll return it.",
        "Make sure no one's looking before I take it!"
      ]
    },
    {
      question:
        "You have some excess gold and you're passing by a drunkard and a merchant. Do you...",
      category: "good",
      answers: [
        "Sit down, ask the drunkard what's wrong, and start a quest to help him",
        "Toss the drunkard a coin-- he's clearly had a hard life.",
        "Use your gold to purchase something for yourself",
        "Wait for the drunkard to fall asleep and pickpocket him so you can buy more stuff.",
        "Cast a spell to turn the drunk to gold, and see if the merchant will accept him as payment."
      ]
    },
    {
      question:
        "You find a wounded creature, it growls and backs away, but is in no fighting shape. You have one healing potion. do you:",
      category: "good",
      answers: [
        "Give it my last potion, and hope it understands the kindness of my gesture.",
        "Guard it to make sure nothing will hurt it while it heals, but keep the potion myself in case it attacks.",
        "Carry on about your way; too risky to stay where blood fills the air.",
        "Take it's food and resources-- it won't be needing them much longer.",
        "Attack it while you're in a position of strength-- Better to get XP than be hunted later."
      ]
    },
    {
      question:
        "You found yourself in a new city and guards approach you rapidly-- you've broken the law by not wearing pink on Wednesday! Do you: ",
      category: "law",
      answers: [
        "Allow them to arrest you and plead your case in court-- there's a process for a reason!",
        "Explain that you didn't know the law existed, but you'll be sure to obey it immediately.",
        "Ask them to explain why they wear pink on Wednesdays and make your decision based on that.",
        "Try to convince them that the law is silly-- besides, their uniforms aren't pink!",
        "Start a riot-- the people here must be freed of this pink tyranny!"
      ]
    }
  ];

  handleChange(q, v) {
    // update the answer for that question
    this.questions[q].answered = true;
    this.questions[q].value = v;
    var s = {}; // running total of the scores for each category
    var a = {}; // keeps track of how many of each category was answered
    s["law"] = 0;
    s["good"] = 0;
    a["law"] = 0;
    a["good"] = 0;
    for (var i = 0; i < this.questions.length; i++) {
      const x = i; // this prevents the "undefined" error.
      if (this.questions[x].answered) {
        s[this.questions[x].category] += this.questions[x].value;
        a[this.questions[x].category]++;
      }
    }
    // average the score for both categories
    s["law"] = s["law"] / (a["law"] ? a["law"] : 1);
    s["good"] = s["good"] / (a["good"] ? a["good"] : 1);

    // set the state to update the graph.
    this.setState({ scores: s, answered: a["law"] + a["good"] });
  }

  render() {
    var QNA = [];
    const answerScore = [0, 1, 2, 3, 4];
    for (var x = 0; x < this.questions.length; x++) {
      QNA.push(
        <div key={"q" + x}>
          <br />
          <label htmlFor={"question" + x}>
            {"Question " + x + ": " + this.questions[x].question}
          </label>
        </div>
      );
      for (var i = 0; i < this.questions[x].answers.length; i++) {
        const category = this.questions[x].category;
        const v = i; // marks what the value of their answer was
        const q = x; // marks which question we're answering
        QNA.push(
          <div key={"a" + q + ":" + v}>
            <input
              type="radio"
              className={this.questions[q].category}
              id={"question" + q}
              name={"question" + q}
              onChange={() => this.handleChange(q, v)}
              value={v}
            />
            <label>{this.questions[q].answers[v]}</label>
          </div>
        );
      }
    }

    return (
      <div className="controller">
        <div className="scrollable"> {QNA}</div>
        <Viz
          law={this.state.scores["law"]}
          good={this.state.scores["good"]}
          answered={this.state.answered}
        />
      </div>
    );
  }
}
