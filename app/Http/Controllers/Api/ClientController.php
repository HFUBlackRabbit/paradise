<?php

namespace App\Http\Controllers\Api;

use App\Client;
use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientResource;
use Illuminate\Http\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ClientCollection
     */
    public function index(): ClientCollection
    {
        $clients = Client::all();
        return new ClientCollection($clients);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ClientRequest $request
     * @return ClientResource
     */
    public function store(ClientRequest $request): ClientResource
    {
        $data = $request->validated();

        $client = new Client($data);
        $client->save();

        return new ClientResource($client);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     * @throws \Exception
     */
    public function destroy(int $id): Response
    {
        /**
         * @var Client $client
         */
        $client = Client::findOrFail($id);
        $client->delete();

        return new Response('', 204);
    }
}
