<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $e
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request, Throwable $e)
    {
        // Check if the request expects a JSON response
        $statusCode = $this->getStatusCode($e);
        if ($statusCode == 404) {
            $response = "Not found";
        } else if ($statusCode == 401) {
            $response = "Unauthorized";
        } else {
            $response = $e->getMessage() . " | " . $e->getFile() . ":" . $e->getLine();
        }

        return response()->json(["error" => $response], $statusCode);

    }

    /**
     * Get the HTTP status code for the exception.
     *
     * @param Throwable $exception
     * @return int
     */
    protected function getStatusCode(Throwable $exception)
    {
        // Default status code
        $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;

        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        } elseif ($exception instanceof ModelNotFoundException) {
            $statusCode = Response::HTTP_NOT_FOUND;
        } elseif ($exception instanceof AuthenticationException) {
            $statusCode = Response::HTTP_UNAUTHORIZED;
        } elseif ($exception instanceof ValidationException) {
            $statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;
        }

        return $statusCode;
    }
}
