package br.com.servphone.rest;

import com.google.gson.Gson;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

/*
 * abaixo o metodo responsavel por enviar a resposta ao cliente sobre
 * a transação realizada (inclusão, consulta, edição ou exclusão) caso
 * ela seja realizada com sucesso.
 * Repare que o metodo em questao aguarda que seja repassado um conteudo que
 * sera referenciado por um objeto chamado result.
 *
 *
 */
public class UtilRest {

    public Response buildResponseJson(Object result) {

        try {
            /*
             * Retorna o objeto de resposta com status 200(ok), tendo em seu corpo o objeto
             * valorResposta (que consiste no objeto result convertido para JSON)
             */
            String valorResposta = new Gson().toJson(result);

            return Response.ok(valorResposta).build();

        } catch (Exception ex) {

            ex.printStackTrace();
            // Se algo der errado acima, cria Response de erro

            return this.buildErrorResponse(ex.getMessage());

        }
    }

    public Response buildErrorResponse(String str) {

        /*
         * Abaixo o objeto rb recebe o status do erro.
         */

        ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
        /*
         *
         * Define a entidade (objeto), que nesse caso é uma mensagem que será retornado
         * para o cliente
         */

        rb = rb.entity(str);

        /*
         * Define o tipo de retorno desta entidade(objeto), no caso é definido como
         * texto simples
         *
         */

        rb = rb.type("text/plain");
        /*
         * REtorna o objeto de resposta com status 500(erro), junto com a String
         * contendo a mensagem de erro.
         */

        return rb.build();
    }

    public Response buildResponseMsg(String result) {

        /*
         * Abaixo o objeto rb recebe o status do erro.
         */

        ResponseBuilder rb = Response.status(Response.Status.OK);
        /*
         *
         * Define a entidade (objeto), que nesse caso é uma mensagem que será retornado
         * para o cliente
         */

        rb = rb.entity(result);

        /*
         * Define o tipo de retorno desta entidade(objeto), no caso é definido como
         * texto simples
         *
         */

        rb = rb.type("text/plain");
        /*
         * REtorna o objeto de resposta com status 500(erro), junto com a String
         * contendo a mensagem de erro.
         */

        return rb.build();
    }

}
