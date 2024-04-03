CREATE DATABASE IF NOT EXISTS X_database CHARACTER SET SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE X_database;

/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 8                                  */
/* Date de création :  02/04/2024 11:15:52                      */
/*==============================================================*/




drop table if exists COMMENT cascade;

drop table if exists FOLLOWERS cascade;

drop table if exists FOLLOWING cascade;

drop table if exists LIKED cascade;

drop table if exists MEDIA cascade;

drop table if exists POST cascade;

drop table if exists SAVED cascade;

drop table if exists YUSER cascade;


/*==============================================================*/
/* Table : YUSER                                                */
/*==============================================================*/
create table YUSER (
   YUSERID              SERIAL               not null,
   YUSERPSEUDO          VARCHAR(30)          null,
   YUSERNAME            VARCHAR(30)          null,
   YUSERBIRTHDAY        DATE                 null,
   YUSERPASSWORD        VARCHAR(50)          null,
   YUSERROLE            VARCHAR(20)          null,
   YUSERPREMIUM         BOOL                 null,
   constraint PK_YUSER primary key (YUSERID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : USER_PK                                              */
/*==============================================================*/
create unique index USER_PK on YUSER (
YUSERID
);

/*==============================================================*/
/* Table : POST                                                 */
/*==============================================================*/
create table POST (
   POSTID               SERIAL               not null,
   YUSERID              INT4                 not null,
   POSTDATE             DATE                 null,
   POSTDESCRIPTION      VARCHAR(280)         null,
   constraint PK_POST primary key (POSTID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : POST_PK                                              */
/*==============================================================*/
create unique index POST_PK on POST (
POSTID
);

/*==============================================================*/
/* Index : POSTED_FK                                            */
/*==============================================================*/
create  index POSTED_FK on POST (
YUSERID
);

/*==============================================================*/
/* Table : COMMENT                                              */
/*==============================================================*/
create table COMMENT (
   COMMENTID            SERIAL               not null,
   POSTID               INT4                 not null,
   YUSERID              INT4                 not null,
   COMMENTDATE          DATE                 null,
   COMMENTTEXT          VARCHAR(2000)        null,
   constraint PK_COMMENT primary key (COMMENTID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : COMMENT_PK                                           */
/*==============================================================*/
create unique index COMMENT_PK on COMMENT (
COMMENTID
);

/*==============================================================*/
/* Index : POSTCOMMENT_FK                                       */
/*==============================================================*/
create  index POSTCOMMENT_FK on COMMENT (
POSTID
);

/*==============================================================*/
/* Index : USERCOMMENT_FK                                       */
/*==============================================================*/
create  index USERCOMMENT_FK on COMMENT (
YUSERID
);

/*==============================================================*/
/* Table : FOLLOWERS                                            */
/*==============================================================*/
create table FOLLOWERS (
   YUSERID              INT4                 not null,
   FOLLOWERSID          INT4                 not null,
   constraint PK_FOLLOWERS primary key (YUSERID, FOLLOWERSID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : FOLLOWERS_PK                                         */
/*==============================================================*/
create unique index FOLLOWERS_PK on FOLLOWERS (
YUSERID,
FOLLOWERSID
);

/*==============================================================*/
/* Index : FOLLOWERS_FK                                         */
/*==============================================================*/
create  index FOLLOWERS_FK on FOLLOWERS (
YUSERID
);

/*==============================================================*/
/* Index : FOLLOWERS2_FK                                        */
/*==============================================================*/
create  index FOLLOWERS2_FK on FOLLOWERS (
FOLLOWERSID
);

/*==============================================================*/
/* Table : FOLLOWING                                            */
/*==============================================================*/
create table FOLLOWING (
   YUSERID              INT4                 not null,
   FOLLOWINGID          INT4                 not null,
   constraint PK_FOLLOWING primary key (YUSERID, FOLLOWINGID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : FOLLOWING_PK                                         */
/*==============================================================*/
create unique index FOLLOWING_PK on FOLLOWING (
YUSERID,
FOLLOWINGID
);

/*==============================================================*/
/* Index : FOLLOWING_FK                                         */
/*==============================================================*/
create  index FOLLOWING_FK on FOLLOWING (
YUSERID
);

/*==============================================================*/
/* Index : FOLLOWING2_FK                                        */
/*==============================================================*/
create  index FOLLOWING2_FK on FOLLOWING (
FOLLOWINGID
);

/*==============================================================*/
/* Table : LIKED                                                */
/*==============================================================*/
create table LIKED (
   POSTID               INT4                 not null,
   YUSERID              INT4                 not null,
   constraint PK_LIKED primary key (POSTID, YUSERID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : LIKED_PK                                             */
/*==============================================================*/
create unique index LIKED_PK on LIKED (
POSTID,
YUSERID
);

/*==============================================================*/
/* Index : LIKED_FK                                             */
/*==============================================================*/
create  index LIKED_FK on LIKED (
POSTID
);

/*==============================================================*/
/* Index : LIKED2_FK                                            */
/*==============================================================*/
create  index LIKED2_FK on LIKED (
YUSERID
);

/*==============================================================*/
/* Table : MEDIA                                                */
/*==============================================================*/
create table MEDIA (
   MEDIAID              SERIAL               not null,
   COMMENTID            INT4                 null,
   POSTID               INT4                 null,
   YUSERID              INT4                 null,
   MEDIACONTENT         VARCHAR(500)         null,
   constraint PK_MEDIA primary key (MEDIAID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : MEDIA_PK                                             */
/*==============================================================*/
create unique index MEDIA_PK on MEDIA (
MEDIAID
);

/*==============================================================*/
/* Index : PROFILPICTURE_FK                                     */
/*==============================================================*/
create  index PROFILPICTURE_FK on MEDIA (
YUSERID
);

/*==============================================================*/
/* Index : MEDIAPOST_FK                                         */
/*==============================================================*/
create  index MEDIAPOST_FK on MEDIA (
POSTID
);

/*==============================================================*/
/* Index : MEDIACOMMENT_FK                                      */
/*==============================================================*/
create  index MEDIACOMMENT_FK on MEDIA (
COMMENTID
);


/*==============================================================*/
/* Table : SAVED                                                */
/*==============================================================*/
create table SAVED (
   YUSERID              INT4                 not null,
   POSTID               INT4                 not null,
   constraint PK_SAVED primary key (YUSERID, POSTID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*==============================================================*/
/* Index : SAVED_PK                                             */
/*==============================================================*/
create unique index SAVED_PK on SAVED (
YUSERID,
POSTID
);

/*==============================================================*/
/* Index : SAVED_FK                                             */
/*==============================================================*/
create  index SAVED_FK on SAVED (
YUSERID
);

/*==============================================================*/
/* Index : SAVED2_FK                                            */
/*==============================================================*/
create  index SAVED2_FK on SAVED (
POSTID
);


-- alter table COMMENT
--    add constraint FK_COMMENT_POSTCOMME_POST foreign key (POSTID)
--       references POST (POSTID)
--       on delete restrict on update restrict;

-- alter table COMMENT
--    add constraint FK_COMMENT_USERCOMME_YUSER foreign key (YUSERID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table FOLLOWERS
--    add constraint FK_FOLLOWER_FOLLOWERS_YUSER foreign key (YUSERID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table FOLLOWERS
--    add constraint FK_FOLLOWER_FOLLOWERS_USER2 foreign key (FOLLOWERSID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table FOLLOWING
--    add constraint FK_FOLLOWIN_FOLLOWING_YUSER foreign key (YUSERID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table FOLLOWING
--    add constraint FK_FOLLOWIN_FOLLOWING_USER2 foreign key (FOLLOWINGID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table LIKED
--    add constraint FK_LIKED_LIKED_POST foreign key (POSTID)
--       references POST (POSTID)
--       on delete restrict on update restrict;

-- alter table LIKED
--    add constraint FK_LIKED_LIKED2_YUSER foreign key (YUSERID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table MEDIA
--    add constraint FK_MEDIA_MEDIACOMM_COMMENT foreign key (COMMENTID)
--       references COMMENT (COMMENTID)
--       on delete restrict on update restrict;

-- alter table MEDIA
--    add constraint FK_MEDIA_MEDIAPOST_POST foreign key (POSTID)
--       references POST (POSTID)
--       on delete restrict on update restrict;

-- alter table MEDIA
--    add constraint FK_MEDIA_PROFILPIC_YUSER foreign key (YUSERID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table POST
--    add constraint FK_POST_POSTED_YUSER foreign key (YUSERID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table SAVED
--    add constraint FK_SAVED_SAVED_YUSER foreign key (YUSERID)
--       references YUSER (YUSERID)
--       on delete restrict on update restrict;

-- alter table SAVED
--    add constraint FK_SAVED_SAVED2_POST foreign key (POSTID)
--       references POST (POSTID)
--       on delete restrict on update restrict;


insert into YUSER (YUSERID, YUSERPSEUDO, YUSERNAME, YUSERBIRTHDAY, YUSERPASSWORD, YUSERROLE, YUSERPREMIUM) values (1, 'Shiro', 'Shiro_1234', '2003-03-8', '6T840VLM3QGB2AU8Y3AKHTTRNBR', 'YUSER', true);

insert into YUSER (YUSERID, YUSERPSEUDO, YUSERNAME, YUSERBIRTHDAY, YUSERPASSWORD, YUSERROLE, YUSERPREMIUM) values (2, 'HEO', 'HEO_1234', '2003-02-17', '640YQVLMEVGNCQZD25KA3A KHTTR0NDNBRQ', 'YUSER', false);

insert into YUSER (YUSERID, YUSERPSEUDO, YUSERNAME, YUSERBIRTHDAY, YUSERPASSWORD, YUSERROLE, YUSERPREMIUM) values (3, 'Macfly_02', 'Macfly_1234', '2004-11-02', '6T840YMEVGN0B3QGBKAU8Y3A KHTT0DNBRQ', 'YUSER', false);

insert into YUSER (YUSERID, YUSERPSEUDO, YUSERNAME, YUSERBIRTHDAY, YUSERPASSWORD, YUSERROLE, YUSERPREMIUM) values (4, 'LaDIOo', 'LaDIOo_1234', '2003-03-8', '6T840YQVLGRT3QGB2RGKY3A KHTTR0LQND', 'YUSER', false);

insert into YUSER (YUSERID, YUSERPSEUDO, YUSERNAME, YUSERBIRTHDAY, YUSERPASSWORD, YUSERROLE, YUSERPREMIUM) values (5, 'Theoxeu', 'Theoxeu_1234', '2003-03-8', '6T840YMVHSDO0B3QGBGKAU83A KHTTRQNDBRQ', 'YUSER', true);


insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (1, 5, '2023-04-23', 'Hello, les gars rien de mieux que de fumer pour commencer la journée');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (2, 3, '2024-04-03', 'Content warning nouveau petit banger comme jeu');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (3, 1, '2024-04-02', 'Je construit des murs');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (4, 5, '2024-03-31', 'Hier avec David, petit date en legende avec supplement');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (5, 1, '2024-02-15', 'Les ghars petit fortnite avec les vraies ce soir venais nombreu');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (6, 2, '2024-01-23', 'feur');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (7, 4, '2023-12-02', 'Je me suis encore pas réveillé');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (8, 4, '2023-11-10', 'POV je viens de rater mon contrôle de math, mais on garde le smile :)');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (9, 1, '2024-01-22', 'La SNCF ce fou de ma geuele');

insert into POST (POSTID, YUSERID, POSTDATE, POSTDESCRIPTION) values (10, 2, '2024-03-30', 'Acheron bá vãi nồiiiii #HonkaiStarRail');



insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (1, 1, 1, '2023-04-24', 'A quand un petit fortnite??');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (2, 5, 2, '2024-02-15', 'Viens Naraka !! #NarakaBladePoint');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (3, 9, 3, '2024-01-23', 'Arrête de secher les cours');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (4, 10, 5, '2024-03-31', 'On a rien compris, parle français fils de p***');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (5, 8, 5, '2023-11-12', 'Frero on est la hein :,)');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (6, 9, 4, '2024-01-24', 'bro fais gaffe il y a un carton sur la voie !!');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (7, 4, 1, '2024-04-01', 'Tu ma tromper sale bat*** !!');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (8, 10, 1, '2024-04-02', 'Chin Chong Thag !');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (9, 1, 2, '2023-04-24', 'C`est pas bien !');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (10, 4, 2, '2024-04-02', 'Beau drama 🍿');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (11, 4, 3, '2024-04-02', '🤣');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (12, 3, 5, '2024-04-03', 'Ok cool');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (13, 2, 2, '2024-04-04', 'Je l`ai pas eu quand il était gratuit 😭');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (14, 5, 4, '2024-02-16', 'Go top1');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (15, 1, 5, '2023-04-25', 'Rien de mieux je suis d`accord');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (16, 10, 5, '2024-04-02', 'WOW 😨');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (17, 8, 1, '2023-11-14', 'On est là 😥');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (18, 6, 3, '2024-01-23', '....');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (19, 7, 2, '2023-12-03', 'tkt on est habitué');

insert into COMMENT (COMMENTID, POSTID, YUSERID, COMMENTDATE, COMMENTTEXT) values (20, 3, 5, '2024-04-05', 'Ils sont solide au moins??');

insert into MEDIA (MEDIAID, COMMENTID,MEDIACONTENT) values (1, 8,'https://media.routard.com/image/41/1/pt54785.1264411.w430.jpg');

insert into MEDIA (MEDIAID, COMMENTID,MEDIACONTENT) values (2, 1,'https://i.kym-cdn.com/entries/icons/original/000/034/213/cover2.jpg');

insert into MEDIA (MEDIAID, COMMENTID,MEDIACONTENT) values (3, 17,'https://ih1.redbubble.net/image.1539737948.3563/raf,750x1000,075,t,FFFFFF:97ab1c12de.u1.jpg');

insert into MEDIA (MEDIAID, COMMENTID,MEDIACONTENT) values (4, 4,'https://miro.medium.com/v2/resize:fit:1358/1*GI-td9gs8D5OKZd19mAOqA.png');

insert into MEDIA (MEDIAID, COMMENTID,MEDIACONTENT) values (5, 2,'https://us-tuna-sounds-images.voicemod.net/332d9b5b-611c-4035-9f5d-1766e8b72694-1662190934434.png');

insert into MEDIA (MEDIAID, POSTID, MEDIACONTENT) values (6, 9,'https://images.ladepeche.fr/api/v1/images/view/636b77dfaa9e0f4f6132e51e/large/image.jpg?v=1');

insert into MEDIA (MEDIAID, POSTID, MEDIACONTENT) values (7, 2,'https://www.dexerto.fr/cdn-image/wp-content/uploads/sites/2/2024/04/02/combien-de-personnes-peuvent-jouer-a-content-warning.jpg?width=3840&quality=60&format=auto');

insert into MEDIA (MEDIAID, POSTID, MEDIACONTENT) values (8, 1,'https://thegatewayonline.ca/wp-content/uploads/2019/01/Elon-musk-blunt-780x405.jpg');

insert into MEDIA (MEDIAID, POSTID, MEDIACONTENT) values (9, 8,'https://pbs.twimg.com/media/FGuAOVPXsAUIsk1.jpg:large');

insert into MEDIA (MEDIAID, POSTID, MEDIACONTENT) values (10, 7,'https://external-preview.redd.it/qDEKOr5B19oacM4cYtGLjRTTgBTgVq7rKLmoNGao47s.png?format=pjpg&auto=webp&s=6e166aefa102841832def08631844cf255d33c97');

insert into MEDIA (MEDIAID, YUSERID, MEDIACONTENT) values (11, 1,'https://media.discordapp.net/attachments/1220714504669761657/1221742095723663370/IMG_20240131_112117.jpg?ex=6613aefe&is=660139fe&hm=6e24261d5b82d3cb1cc383e82b9e2f7b8447914c93c68ddd77cce5b0c2cfcc5b&=&format=webp&width=385&height=488');

insert into MEDIA (MEDIAID, YUSERID, MEDIACONTENT) values (12, 2,'https://media.discordapp.net/attachments/1220714504669761657/1221746516209832006/IMG_0138.jpg?ex=6613b31c&is=66013e1c&hm=25db54b89a34194ad6dfd303cdf7e12fe53fb44f94caecfa2f55f528b5c03090&=&format=webp&width=488&height=488');

insert into MEDIA (MEDIAID, YUSERID, MEDIACONTENT) values (13, 3,'https://comptoirdugeek.com/cdn/shop/files/PochitaPlush_2ft_01.webp?v=1691409818&width=1445');

insert into MEDIA (MEDIAID, YUSERID, MEDIACONTENT) values (14, 4,'https://pbs.twimg.com/profile_images/949995886926614528/rNvywiDY_400x400.jpg');

insert into MEDIA (MEDIAID, YUSERID, MEDIACONTENT) values (15, 5,'https://i.ebayimg.com/images/g/Vc8AAOSw6GFitUoQ/s-l1600.jpg');

insert into SAVED (YUSERID, POSTID) values (1, 4);

insert into SAVED (YUSERID, POSTID) values (2, 8);

insert into SAVED (YUSERID, POSTID) values (4, 1);

insert into SAVED (YUSERID, POSTID) values (5, 10);

insert into SAVED (YUSERID, POSTID) values (4, 2);

insert into SAVED (YUSERID, POSTID) values (2, 9);

insert into SAVED (YUSERID, POSTID) values (5, 5);


insert into LIKED (YUSERID, POSTID) values (1, 1);

insert into LIKED (YUSERID, POSTID) values (3, 10);

insert into LIKED (YUSERID, POSTID) values (5, 8);

insert into LIKED (YUSERID, POSTID) values (4, 7);

insert into LIKED (YUSERID, POSTID) values (2, 9);

insert into LIKED (YUSERID, POSTID) values (3, 2);

insert into LIKED (YUSERID, POSTID) values (1, 3);

insert into LIKED (YUSERID, POSTID) values (4, 3);

insert into LIKED (YUSERID, POSTID) values (2, 3);

insert into LIKED (YUSERID, POSTID) values (5, 1);


insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (1, 2);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (1, 3);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (1, 4);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (1, 5);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (2, 1);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (2, 3);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (3, 1);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (3, 4);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (3, 5);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (3, 2);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (4, 1);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (4, 3);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (5, 1);

insert into FOLLOWERS (YUSERID, FOLLOWERSID) values (5, 2);



insert into FOLLOWING (YUSERID, FOLLOWINGID) values (1, 2);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (1, 3);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (1, 4);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (1, 5);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (2, 1);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (2, 3);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (3, 4);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (3, 1);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (4, 2);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (4, 1);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (4, 3);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (5, 1);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (5, 2);

insert into FOLLOWING (YUSERID, FOLLOWINGID) values (5, 3);

