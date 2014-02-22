nest
====

Nest an element in a endless string of parent elements.

<h3>Example</h3>
<p>To return the nested HTML without replacing the original element immediately:</p>
<p>var nested = nest( target, 'li ul' );</p>

<p>To nest an element and replace it immediately:</p>
<p>nest( target, 'li ul', 'replace' );</p>
