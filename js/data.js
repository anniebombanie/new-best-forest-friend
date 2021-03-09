const questions = [
  { diet: {
    q: `Which diet is most similar to yours?`,
    a: {
      bear: `Meat. Delicious meat.`,
      rabbit: `You're vegan.`,
      fox: `Whatever. Not fussy.`,
      owl: `You eat only because you must.`
      }
    }
  },
  { stranger: {
    q: `How would you react if a stranger was yelling angrily at you?`,
    a: {
      bear: `Yell back at them! You won't lose.`,
      rabbit: `Run away as fast and as far as you could.`,
      fox: `Charm your way out.`,
      owl: `Calm them down through paitent reasoning.`
      }
    }
  },
  { movie: {
    q: `What's your favourite movie genre?`,
    a: {
      bear: `Action`,
      rabbit: `Fantasy`,
      fox: `Comedy`,
      owl: `Documentary`
      }
    }
  },
  { upset: {
    q: `If your friend was upset, how would you cheer them up?`,
    a: {
      bear: `Who dare hurt them? You will destory them!!`,
      rabbit: `You'd probably cry with them. Their pain is your pain.`,
      fox: `Suggest fun things to do as a distraction.`,
      owl: `Listen sympathically and talk things through.`
      }
    }
  },
  { habit: {
    q: `What's a negative character trait of yours?`,
    a: {
      bear: `You tend to act before you think.`,
      rabbit: `You often put others' needs before your own.`,
      fox: `You can be single-minded & blind to the feelings of others.`,
      owl: `You could probably be described as a workaholic.`
      }
    }
  },
  { fear: {
    q: `What's your biggest fear in life?`,
    a: {
      bear: `To rely on others to take care of you.`,
      rabbit: `To be taken advantage of by others.`,
      fox: `To be frumpy and boring.`,
      owl: `To go crazy, unable to make sense of the world.`
      }
    }
  },
  { party: {
    q: `What do you do at parties?`,
    a: {
      bear: `Hello food table! Eat and drink as much as possible.`,
      rabbit: `You didn't wanna come, your friend dragged you here.`,
      fox: `You love parties! Make new friends with everyone!`,
      owl: `Enjoy intellectually stimulating conversations.`
      }
    }
  }
]

 //OBJECT: Stores user's choice from questions
 const userChoice = {
  choice1: $(`input[name=q-diet]:checked`).val(),
  choice2: $(`input[name=q-stranger]:checked`).val()
},

const results = {
  bear: {
    name: `bear`,
    img: `./assets/bear.svg`,
    // class: `img-result img-result-bear`,
    // alt: `illustration of a bear.`,
    description: `Like your new forest friend, BEAR, you are fearless and confident with a larger-than-life character. Danger in the forest? Pffttp- you laugh in the face of danger.`,
    counter: 0,
  },
  rabbit: {
    name: `rabbit`,
    img: `./assets/rabbit.svg`,
    // class: `img-result img-result-rabbit`,
    // alt: `illustration of a rabbit.`,
    description: `While navigating through the forest, you stay alert and vigilant. Together with your new forest friend, RABBIT, you'll avoid any dangers that might suddenly pop up.`,
    counter: 0
  },
  fox: {
    name: `fox`,
    img: `./assets/fox.svg`,
    description: `With your sharp wit and quick mind, you can predict danger before it happens. Along with your new forest friend, FOX, navigating your way out is easy peasy lemon squeezy.`,
    counter: 0,
  },
  owl: {
    name: `owl`,
    img: `./assets/owl.svg`,
    description: `There's little in the way that gets past your sharp intellect. The forest is no danger because with your new forest friend, OWL, you'll both systemetically tackle anything that comes up.`,
    counter: 0,
  }
}