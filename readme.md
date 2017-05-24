This is a very simple wrapper around [MathJax-Node](https://github.com/mathjax/MathJax-node), to which you can post snippets of LaTeX and get back and `svg` element that you can render as html.  To start the server:

    npm install
    node index.js

The server will listen on port [6174](https://en.wikipedia.org/wiki/6174_(number)) for requests.  If you navigate to [http://localhost:6174/](http://localhost:6174/) in your browser you should get the formula for the Gamma function:

![Gamma Function](https://github.com/lawrencetaylor/MathJaxServer/blob/master/docs/images/Gamma.PNG?raw=true)

To "htmlify" arbitrary latex, you need to post json-fied LaTex to the server.  E.g. the following request will render an `svg` element displaying Green's Theorem:

```
POST http://localhost:6174/ HTTP/1.1
Content-Type: application/json

{
    "math": "\\int_C P\\,du + Q\\, dv = \\int\\!\\!\\!\\int_A \\left({\\partial Q\\over \\partial u} - {\\partial P\\over \\partial v}\\right) {1\\over \\sqrt{EG-F^2}}\\,dA"
}
```

![Green's Theorem](https://github.com/lawrencetaylor/MathJaxServer/blob/master/docs/images/GreensTheorem.PNG?raw=true)

The server has the AMScd package installed, so you can draw basic commutative diagrams:

```
POST http://localhost:6174/ HTTP/1.1
Content-Type: application/json

{
	"math": "\\begin{CD}\r\nA @>f>> B  \\\\\r\n@VVFV @VVFV\\\\\r\nF(A) @>F(f)>> F(B)\r\n\\end{CD}"
}
```

yields 

![Commutative Diagram](https://raw.githubusercontent.com/lawrencetaylor/MathJaxServer/master/docs/images/Commutative.PNG?raw=true)


## Running within a Docker container

You can run this application as a docker container:

    docker run -p 1729:6174 lawrencetaylor/mathjaxserver

This will expose the web application on port 1729 of your local machine.

