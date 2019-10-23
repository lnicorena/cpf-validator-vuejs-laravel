<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Http\Request;
use \App\Http\Requests\DocumentRequest;

/**
 * Documents resource representation.
 *
 * @Resource("Documents", uri="/api/documents")
 */
class DocumentsController extends Controller
{
    /**
     * Documents list.
     *
     * @return \Illuminate\Http\Response
     * 
     * @Get("/")
     */
    public function index()
    {
        return response()->json(['items'=> Document::all()]);
    }
    

    /**
     * Store a newly created document in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DocumentRequest $request)
    {
        return Document::create($request->all());
    }

    /**
     * Display the specified document.
     *
     * @param  \App\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function show(Document $document)
    {
        return response()->json($document);
    }

    /**
     * Update the specified document in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $id of the document
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'active'    => 'required',
            'blacklist' => 'required',
        ]);

        $document = Document::findOrFail($id);
        $document->update($request->all());
        
        return response()->json($document);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  $id of the document
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $document = Document::findOrFail($id);
        $document->delete();
        
        return response()->noContent();
    }
}
