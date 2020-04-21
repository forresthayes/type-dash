
import React from "react"

const sonnet29 = `When, in disgrace with fortune and men’s eyes,
I all alone beweep my outcast state,
And trouble deaf heaven with my bootless cries,
And look upon myself and curse my fate,
Wishing me like to one more rich in hope,
Featured like him, like him with friends possessed,
Desiring this man’s art and that man’s scope,
With what I most enjoy contented least;
Yet in these thoughts myself almost despising,
Haply I think on thee, and then my state,
(Like to the lark at break of day arising
From sullen earth) sings hymns at heaven’s gate;
For thy sweet love remembered such wealth brings
That then I scorn to change my state with kings.`

let sonnetLines = sonnet29.split(/\n/).map(line => line.trim())

const couplets = []
for (let i = 0; i < sonnetLines.length; i += 2) {
  couplets.push(sonnetLines.slice(i, i + 2).join('\n'))
}

const prompts = couplets.map(couplet => {
  const [line1, line2] = couplet.split(/\n/)
  return <p>{line1}<br />{line2}</p>
})

export function* prompter() {
  let i = 0
  while (true) {
    yield prompts[i]
    if (i === prompts.length - 1) {
      i = 0
    } else {
      i += 1
    }
  }
}