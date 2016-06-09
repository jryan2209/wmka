<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;
use League\Fractal\Manager;
use League\Fractal\Pagination\Cursor;
use League\Fractal\Pagination\CursorInterface;
use Validator;
use App\API\transformers\PostTransformer;
use Illuminate\Http\Request;
use App\Post;
use App\Event;

class EventController extends ApiController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{
		Auth::user()->load(['groups.posts.event.post' => function ($q) use ( &$posts) {
		       $posts = $q->limit($this->per_page)
		       			->skip($this->current)
		       			->get()
		       			->unique();
		}]);
		if($posts) {
			$cursor = new Cursor($this->current, $this->prev, $this->next, $posts->count());
			return $this->respondWithCursor($posts, new PostTransformer, $cursor);
		}
		return $this->errorNotFound('No events found');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		$validator = Validator::make(
			$request->all(),
			[
				// post
				'published' => 'required|date|before:end',
				// event
				'start' => 'required|date',
				'end' => 'required|date|after:start',
				'group' => 'required|integer',
				'comments' => 'required|boolean',
			]
		);
		if($validator->passes())
		{
			// TBD check user has write access to group
			$event = Event::create([
				'starts_at' => $request->start,
				'ends_at' => $request->end,
				'group_id' => (int) $request->group,
				'allow_comments' => (bool) $request->comments
			]);
			$post = Post::create([
				'user_id' => Auth::user()->id,
				'published_at' => $request->published,
				'postable_type' => 'App\Event',
				'postable_id' => $event->id
			]);
			if($post && $event)
			{
				return $this->respondWithItem($post, new PostTransformer)
			} else {
				return $this->errorInternal('Could not create post');
			}
			
		} else {
			return $this->errorValidation($validator->messages);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show(Post $post)
	{
		Auth::user()->load(['groups.posts.event.post' => function ($q) use ( &$events ) {
		    $events = $q->get()->unique();
		}]);
		if($events->contains($post)) {
			return $this->respondWithItem($post, new PostTransformer);	
		} else {
			return $this->errorNotFound('Event not found');	
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(Post $post, Request $request)
	{
		$validator = Validator::make(
			$request->all(),
			[
				// post
				'published' => 'sometimes|date',
				// event
				'start' => 'sometimes|date',
				'end' => 'sometimes|date',
				'group' => 'sometimes|integer',
				'comments' => 'sometimes',
			]
		);
		if($validator->passes())
		{
			// TBD check user has write access to group
			$event = $post->event;

			$event->starts_at = ($request->start) ? $request->start : $event->starts_at;
			$event->ends_at = ($request->end) ? $request->end : $event->ends_at;
			$event->allow_comments = ($request->comments) ? (bool) $request->comments : $event->allow_comments;
			$event->group_id = ($request->group) ? (bool) $request->group : $event->group_id;

			$event->save();
			if($event->save())
			{
				return $this->respondWithItem($post, new PostTransformer);
			} else {
				return $this->errorInternal('Unable to update event');
			}
			
		} else {
			return $this->errorValidation($validator->messages);
		}	
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy(Post $post)
	{
		if($post->delete()) {
			return $this->respondSuccess('Event Deleted');
		}
	}

}
