<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>

    <!-- Reset css -->
    <style>
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }

        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
            display: block;
        }

        body {
            line-height: 1;
        }

        ol,
        ul {
            list-style: none;
        }

        blockquote,
        q {
            quotes: none;
        }

        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
            content: "";
            content: none;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
    </style>

    <!-- Root css -->
    <style>
        .body * {
            padding: 0;
            margin: 0;
        }

        .body *,
        ::before,
        ::after {
            box-sizing: border-box;
        }

        .body {
            font-size: 1rem;
            line-height: 1.5;
        }
    </style>

    <!-- Styles css -->
    <style>
        .body {
            width: 756px;
            margin: 0 auto;
        }

        .container {
            padding: 60px;
            background-color: #f9f9f9;
        }

        .logo-wrap {
            text-align: center;
        }

        .logo {
            display: inline-block;
            height: 60px;
        }

        .wrap {
            padding: 40px;
            margin: 20px auto;
            background-color: white;
            box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
        }

        .heading {
            margin: 20px 0;
            font-weight: 500;
            font-size: 1.25rem;
            color: #4f545c;
        }

        .description {
            margin-top: 16px;
            margin-bottom: 32px;
            color: #737f8d;
        }

        .button {
            display: block;
            width: 140px;
            padding: 14px 18px;
            margin: 0 auto;
            background-color: #5865f2;
            border-radius: 2px;
            font-size: 0.875rem;
            text-align: center;
            text-decoration: none;
            color: white !important;
        }
    </style>
</head>
<body>
<div class="body">
    <div class="container">
        <div class="logo-wrap">
            <a href="http://localhost:4000">
                <img
                        src="https://res.cloudinary.com/dat2lyvva/image/upload/v1706627664/laptop_store/logo/logo-text_bcpcxs.png"
                        alt=""
                        class="logo"
                />
            </a>
        </div>
        <div class="wrap">
            <h2 class="heading">Xin chào ${email},</h2>
            <div class="description">Rất vui vì bạn đã đăng ký tài khoản trên Laptopstore! Vui lòng bấm vào nút bên dưới
                để xác thực email của bạn
            </div>
            ${buttonLink}
        </div>
    </div>
</div>
</body>
</html>
