import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { UserRole } from '@global/user-role/model'
import { Announcement } from '@milestone/announcement/model'
import { ProjectComment } from '@milestone/project/_child/comment/model'
import { TaskComment } from '@milestone/task/_child/comment/model'
import { Task } from '@milestone/task/model'

@Entity()
export class User {
  /***** columns *****/
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    nullable: false,
    unique: true
  })
  public email: string

  @Column()
  public firstname: string

  @Column()
  public lastname: string

  @Column({
    select: false
  })
  public password: string

  @Column({
    type: 'text'
  })
  public status: string

  @Column()
  public gitHubToken: string

  @Column({
    default: true
  })
  public active: boolean

  /***** relations *****/
  @OneToMany(type => Task, task => task.author)
  public author: Task[]

  @OneToMany(type => Task, task => task.author)
  public assignee: Task[]

  @OneToMany(type => TaskComment, taskComment => taskComment.author)
  public taskComments: TaskComment[]

  @OneToMany(type => ProjectComment, projectComment => projectComment.author)
  public projectComments: ProjectComment[]

  @OneToMany(type => Announcement, announcement => announcement.author)
  public announcements: Announcement[]

  @ManyToOne(type => UserRole, userRole => userRole.users)
  public userRole: UserRole
}